(ns lt.plugins.rolex.compiler
  (:require [clojure.walk :refer [postwalk]])
  (:refer-clojure :exclude [alias]))

(def interns (atom {'clojure.core/deref 'deref}))
(def aliases (atom {}))

(defn alias [alias namespace-sym]
  (do (swap! aliases assoc (str alias) (str namespace-sym)) nil))


(defn- ->alias [sym]
  (when (symbol? sym)
    (get @aliases (namespace sym))))


(defn- resolve-alias [sym]
  (when-let [ns (->alias sym)]
    (get @interns (symbol ns (name sym)))))


(defn- resolve-with-current-ns [sym ns]
  (when (symbol? sym)
    (get @interns (symbol ns (name sym)))))

@interns
(defn inline [form current-ns]
  (letfn [(transform [x]
                     (if-let [s (or (get @interns x)
                                    (resolve-alias x)
                                    (resolve-with-current-ns x current-ns))]
                       (inline s current-ns)
                       x))]
    (postwalk transform form)))
