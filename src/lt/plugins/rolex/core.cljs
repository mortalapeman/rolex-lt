(ns lt.plugins.rolex.core
  (:require [lt.objs.files :as files]
            lt.plugins.rolex.compiler)
  (:require-macros [lt.plugins.rolex.macros :as rm]))


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
