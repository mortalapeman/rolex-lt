(ns lt.plugins.rolex.compile
  (:require [clojure.walk :refer [postwalk]])
  (:require-macros [lt.plugins.rolex.macros :as rm]
                   ))

(def interns (atom {}))

(defn compile [form current-ns]
  (postwalk (fn [x]
              (if-let [s (or (get @interns x)
                             (when (implements? INamed x)
                               (get @interns
                                    (symbol current-ns
                                            (name x)))))]
                (compile s current-ns)
                x)) form))

(comment
  (rm/defn blergs [x]
           (do (println x) x))

  (rm/defwatch asdf (blergs x)))
