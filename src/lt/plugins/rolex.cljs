(ns lt.plugins.rolex
  (:require [lt.object :as object]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]
            [lt.objs.popup :as popup]
            [lt.objs.context :as ctx]
            [lt.util.dom :as dom]
            [clojure.string :as string]
            [lt.plugins.rolex.compiler :as compiler]
            [lt.plugins.rolex.core :refer [cljs-mime clj-mime ed->mime]]
            [lt.plugins.rolex.cljs :as cljs]
            [lt.plugins.rolex.lighttable :as lighttable]
            [lt.plugins.rolex.clj :as clj])
  (:require-macros [lt.macros :refer [defui behavior]]
                   [lt.plugins.rolex.macros :as rm :refer [lense]]))


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
                        (cmd/exec! :editor.watch.custom-watch-selection (str exp) {:verbatim true})))})

(cmd/command {:command :rolex.watch.to-console-as-js
              :desc "Rolex: Watch selection and log to console as js object"
              :exec (fn []
                      (when-let [exp (condp = (ed->mime (pool/last-active))
                                       @cljs-mime cljs/to-console-as-jsobj
                                       nil)]
                        (cmd/exec! :editor.watch.custom-watch-selection (str exp))))})

;;****************************************************
;; Named Capture
;;****************************************************

(defn popup-val []
  (->> (ctx/->obj :popup)
       (object/->content)
       (dom/$ :input)
       (dom/val)))

(defn focus-on-input [obj]
  (->> (object/->content obj)
       (dom/$ :input)
       (dom/focus)))

(defn listen-for-enter [this obj form]
  (dom/on (object/->content obj)
          :keyup
          (fn [e]
            (when (= 13 (.-which e))
              (object/raise this :named-capture.end form (popup-val))))))

(defn sub-capture-name [form name]
  (string/replace (str form) "__CAPTURENAME__" name))

(behavior ::named-capture.begin
          :triggers #{:named-capture.begin}
          :reaction (fn [this form]
                      (let [popup-content {:header "Symbol"
                                           :body [:input {:type "text"}]
                                           :buttons [{:label "OK"
                                                      :action (fn []
                                                                (object/raise this :named-capture.end form (popup-val)))}
                                                     popup/cancel-button]}
                            inst (popup/popup! popup-content)]
                        (focus-on-input inst)
                        (listen-for-enter this inst form))))

(behavior ::named-capture.end
          :triggers #{:named-capture.end}
          :reaction (fn [this form name]
                      (cmd/exec! :editor.watch.custom-watch-selection (sub-capture-name form name))))

(cmd/command {:command :rolex.watch.named-capture
              :desc "Rolex: Watch selection and store in local def with given name"
              :hidden true ;; Not ready for public consumption just yet
              :exec (fn []
                      (when-let [exp (condp = (ed->mime (pool/last-active))
                                       @cljs-mime cljs/named-capture
                                       nil)]
                        (object/raise (pool/last-active) :named-capture.begin exp)))})

;;****************************************************
;; Lenses
;;****************************************************

(lense ::lense.summarize-lt-objs
       :cljs lt.plugins.rolex.lighttable/->summarize
       :alias :->ltsummarize
       :desc "Summarizes light table object maps and lets other values passthrough")


(lense ::lense.values-over-time
       :cljs lt.plugins.rolex.cljs/->values-over-time
       :clj  lt.plugins.rolex.clj/->values-over-time
       :alias :->values-over-time
       :desc "Captures the sequence of values as they pass through the watch")

(lense ::lense.to-console-as-jsobj
       :cljs lt.plugins.rolex.cljs/->console-log
       :alias :->console-log
       :desc "Pass values throught clj->js and log values to the console. Includes
       a preceding line that prints the expression the value came from.")

(object/object* ::watch-lenses
                :tags #{:watch-lense}
                :init (fn [this] nil))

(def lenses (object/create ::watch-lenses))

(rm/defwatch lense-watch
             (let [result (do __SELECTION__)
                   display ((comp __LENSES__) result)]
               __|display|__
               result))

(defn substitue-lenses [fns]
  (string/replace (str lense-watch)
                  "__LENSES__"
                  (apply str (interpose " " (reverse fns)))))

(cmd/command {:command :rolex.watch.with-lenses
              :desc "Rolex: Watch selection and pass result through lense functions"
              :hidden true
              :exec (fn [& ks]
                      (when-not (empty? ks)
                        (let [all (object/raise-reduce lenses :lense+ {})
                              fns (filter (comp not nil?) (for [k ks] (get all k)))]
                          (when (seq fns)
                            (cmd/exec! :editor.watch.custom-watch-selection
                                       (substitue-lenses fns))))))})
