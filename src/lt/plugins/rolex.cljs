(ns lt.plugins.rolex
  (:require [lt.object :as object]
            [lt.objs.editor.pool :as pool]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd])
  (:require-macros [lt.macros :refer [defui behavior]]
                   [lt.plugins.rolex.macros :as rm]))

(rm/deffn atom? [x]
         (instance? Atom x))

(rm/deffn ->deref [x]
         (if (atom? x) (deref x) x))

(defn delayed-mime [name]
  (delay (-> @files/files-obj :types (get name) :mime)))

(defn ed->mime [editor]
  (-> @editor :info :mime))

(def cljs-mime (delayed-mime "ClojureScript"))
(def clj-mime (delayed-mime "Clojure"))


(cmd/command {:command :rolex.watch.values-over-time
              :desc "Rolex: Watch selection values over time"
              :exec (fn []
                      (when-let [exp (condp = (ed->mime (pool/last-active))
                                       @cljs-mime lt.plugins.rolex.cljs/values-over-time
                                       @clj-mime  lt.plugins.rolex.clj/values-over-time
                                       nil)]
                        (cmd/exec! :editor.watch.custom-watch-selection (str exp))))})

(cmd/command {:command :rolex.watch.to-console-as-js
              :desc "Rolex: Watch selection and log to console as js object"
              :exec (fn []
                      (when-let [exp (condp = (ed->mime (pool/last-active))
                                       @cljs-mime lt.plugins.rolex.cljs/to-console-as-jsobj
                                       nil)]
                        (cmd/exec! :editor.watch.custom-watch-selection (str exp))))})
