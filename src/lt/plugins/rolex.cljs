(ns lt.plugins.rolex
  (:require [lt.object :as object]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]
            [lt.objs.popup :as popup]
            [lt.objs.context :as ctx]
            [lt.util.dom :as dom]
            [clojure.string :as string]
            [lt.plugins.rolex.core :refer [cljs-mime clj-mime ed->mime]]
            [lt.plugins.rolex.cljs :as cljs]
            [lt.plugins.rolex.clj :as clj])
  (:require-macros [lt.macros :refer [defui behavior]]
                   [lt.plugins.rolex.macros :as rm]))



(cmd/command {:command :rolex.watch.values-over-time
              :desc "Rolex: Watch selection values over time"
              :exec (fn []
                      (when-let [exp (condp = (ed->mime (pool/last-active))
                                       @cljs-mime cljs/values-over-time
                                       @clj-mime  clj/values-over-time
                                       nil)]
                        (cmd/exec! :editor.watch.custom-watch-selection (str exp))))})

(cmd/command {:command :rolex.watch.rough-time
              :desc "Rolex: Watch selection and show estimated execution time"
              :exec (fn []
                      (when-let [exp (condp = (ed->mime (pool/last-active))
                                       @cljs-mime cljs/convenient-time
                                       @clj-mime  clj/convenient-time
                                       nil)]
                        (cmd/exec! :editor.watch.custom-watch-selection (str exp))))})

(cmd/command {:command :rolex.watch.to-console-as-js
              :desc "Rolex: Watch selection and log to console as js object"
              :exec (fn []
                      (when-let [exp (condp = (ed->mime (pool/last-active))
                                       @cljs-mime cljs/to-console-as-jsobj
                                       nil)]
                        (cmd/exec! :editor.watch.custom-watch-selection (str exp))))})

(cmd/command {:command :rolex.watch.named-capture
              :desc "Rolex: Watch selection and store in local def with given name"
              :exec (fn []
                      (when-let [exp (condp = (ed->mime (pool/last-active))
                                       @cljs-mime cljs/named-capture
                                       nil)]
                        (object/raise (pool/last-active) :named-capture.begin exp)))})

(defn popup-val []
  (->> (ctx/->obj :popup)
       (object/->content)
       (dom/$ :input)
       (dom/val)))

(defn sub-capture-name [form name]
  (string/replace (str form) "__CAPTURENAME__" name))

(behavior ::named-capture.begin
          :triggers #{:named-capture.begin}
          :reaction (fn [this form]
                      (popup/popup! {:header "Symbol"
                                     :body [:input {:type "text"}]
                                     :buttons [{:label "OK"
                                                :action (fn []
                                                          (object/raise this :named-capture.end form (popup-val)))}
                                               popup/cancel-button]})))

(behavior ::named-capture.end
          :triggers #{:named-capture.end}
          :reaction (fn [this form name]
                      (cmd/exec! :editor.watch.custom-watch-selection (sub-capture-name form name))))
