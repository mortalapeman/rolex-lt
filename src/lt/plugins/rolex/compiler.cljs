(ns lt.plugins.rolex.compiler
  (:require [clojure.walk :refer [postwalk]]))

(def interns (atom {'clojure.core/deref 'deref}))

(defn inline [form current-ns]
  (letfn [(transform [x]
                     (if-let [s (or (get @interns x)
                                    (when (implements? INamed x) ;; Experimental: implements?
                                      (get @interns
                                           (symbol current-ns
                                                   (name x)))))]
                       (inline s current-ns)
                       x))]
    (postwalk transform form)))
