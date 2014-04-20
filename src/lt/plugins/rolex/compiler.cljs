(ns lt.plugins.rolex.compiler
  (:require [clojure.walk :refer [postwalk]])
  (:refer-clojure :exclude [alias]))

(def interns (atom {'clojure.core/deref 'deref}))
(def aliases (atom {}))

(defn- ->alias [sym current-ns]
  (when (symbol? sym)
    (get-in @aliases [(symbol current-ns) (symbol (namespace sym))])))


(defn- resolve-alias [sym current-ns]
  (when-let [ns (->alias sym current-ns)]
    (get @interns (symbol ns (name sym)))))


(defn- resolve-with-current-ns [sym ns]
  (when (symbol? sym)
    (get @interns (symbol ns (name sym)))))


(defn inline [form current-ns]
  (letfn [(transform [x]
                     (if-let [s (or (get @interns x)
                                    (resolve-alias x current-ns)
                                    (resolve-with-current-ns x current-ns))]
                       (inline s current-ns)
                       x))]
    (postwalk transform form)))
