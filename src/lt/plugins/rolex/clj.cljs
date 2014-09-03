(ns lt.plugins.rolex.clj
  (:require lt.plugins.rolex.compiler)
  (:require-macros [lt.plugins.rolex.macros :as rm]))

;; Generate fake ID for local function testing
(def __ID__ (str (gensym)))

(rm/deffn capture-values [id v]
         (defonce WATCHLOG (atom {}))
         (swap! WATCHLOG update-in [id] (fnil conj []) v)
         (get @WATCHLOG id "Watch not found"))

(rm/deffn ->values-over-time [x]
          (capture-values __ID__ x))

(rm/defwatch values-over-time
             (let [result (do __SELECTION__)]
               __|(->values-over-time result)|__
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

(rm/deffn inc-watch-count []
  "Returns number of times this function has been run."
  (apply + (capture-values __ID__ 1)))

(rm/defwatch trace-count
  (let [res (do __SELECTION__)
        c (inc-watch-count)]
    __|(str "Hit count: " c)|__
    res))
