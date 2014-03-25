(ns lt.plugins.rolex.clj
  (:require lt.plugins.rolex.compiler)
  (:require-macros [lt.plugins.rolex.macros :as rm]))

(rm/deffn log-values [id v]
         (defonce WATCHLOG (atom {}))
         (swap! WATCHLOG update-in [id] (fnil conj []) v)
         (get @WATCHLOG id "Watch not found"))

(rm/defwatch values-over-time
             (let [result (do __SELECTION__)
                   id __ID__]
               __|(log-values id result)|__
               result))

;; Provided by Beau Fabry
;; https://github.com/bfabry
;;
;; This watch provides a rough estimate of the executtion time of a function.
;; For more precise measurements a profiler should be used.
(rm/defwatch convenient-time
             (let [start (System/currentTimeMillis)
                   res (do __SELECTION__)]
               __|(str (- (System/currentTimeMillis) start) " ms")|__
               res))
