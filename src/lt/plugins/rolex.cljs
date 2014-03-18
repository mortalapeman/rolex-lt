(ns lt.plugins.rolex
  (:require [lt.object :as object]
            [lt.objs.editor.pool :as pool]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd])
  (:require-macros [lt.macros :refer [defui behavior]]))

(defn delayed-mime [name]
  (delay (-> @files/files-obj :types (get name) :mime)))

(def cljs-mime (delayed-mime "ClojureScript"))
(def clj-mime (delayed-mime "Clojure"))

(defn ed->mime [editor]
  (-> @editor :info :mime))

(def cljs-values-over-time
  '(let [result (do __SELECTION__)
         id __ID__]
     (when-not WATCHLOG
       (def WATCHLOG (atom {})))
     (swap! WATCHLOG update-in [id] (fnil conj []) result)
     __|(get @WATCHLOG id "Watch not found")|__
     result))

(def clj-values-over-time
  '(let [result (do __SELECTION__)
         id __ID__]
     (defonce WATCHLOG (atom {}))
     (swap! WATCHLOG update-in [id] (fnil conj []) result)
     __|(get @WATCHLOG id "Watch not found")|__
     result))

(cmd/command {:command :rolex.watch.values-over-time
              :desc "Rolex: Watch selection values over time"
              :exec (fn []
                      (when-let [exp (condp = (ed->mime (pool/last-active))
                                       @cljs-mime cljs-values-over-time
                                       @clj-mime clj-values-over-time
                                       nil)]
                        (cmd/exec! :editor.watch.custom-watch-selection (str exp))))})

(def cljs-to-console-as-jsobj
  '(let [exp (pr-str __SELECTION__)
         result (do __SELECTION__)]
     (.log js/console (str "Watch: " exp " =>"))
     (.log js/console (clj->js result))
     __|result|__
     result))

(cmd/command {:command :rolex.watch.to-console-as-js
              :desc "Rolex: Watch selection and log to console as js object"
              :exec (fn []
                      (when-let [exp (condp = (ed->mime (pool/last-active))
                                       @cljs-mime cljs-to-console-as-jsobj
                                       nil)]
                        (cmd/exec! :editor.watch.custom-watch-selection (str exp))))})
