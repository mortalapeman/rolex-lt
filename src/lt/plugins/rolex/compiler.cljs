(ns lt.plugins.rolex.compiler
  (:require [clojure.walk :refer [postwalk]])
  (:require-macros [lt.plugins.rolex.macros :as rm]))

(def interns (atom {}))

(defn inline [form current-ns]
  (letfn [(transform [x]
                     (if-let [s (or (get @interns x)
                                    (when (implements? INamed x)
                                      (get @interns
                                           (symbol current-ns
                                                   (name x)))))]
                       (inline s current-ns)
                       x))]
    (postwalk transform form)))
