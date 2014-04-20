(ns lt.plugins.rolex.core
  (:require [lt.objs.files :as files]
            [lt.objs.editor.pool :as pool]
            lt.plugins.rolex.compiler)
  (:require-macros [lt.plugins.rolex.macros :as rm]))

(defn delayed-mime [name]
  (delay (-> @files/files-obj :types (get name) :mime)))

(defn ed->mime [editor]
  (-> @editor :info :mime))

(def cljs-mime (delayed-mime "ClojureScript"))
(def clj-mime (delayed-mime "Clojure"))

(defn current-mime []
  (ed->mime (pool/last-active)))
