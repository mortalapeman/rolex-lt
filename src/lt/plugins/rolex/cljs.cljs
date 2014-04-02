(ns lt.plugins.rolex.cljs
  (:require lt.plugins.rolex.compiler)
  (:require-macros [lt.plugins.rolex.macros :as rm]))

(rm/deffn atom? [x]
          (when x
            (instance? Atom x)))

(rm/deffn ->deref [x]
         (if (atom? x) (deref x) x))

(rm/deffn capture [x]
          (if (atom? x)
            (atom @x)
            x))

(rm/deffn capture-values [id x]
         (when-not WATCHLOG
           (def WATCHLOG (atom {})))
         (swap! WATCHLOG update-in [id] (fnil conj []) result)
         (get @WATCHLOG id "Watch not found"))

(rm/defwatch values-over-time
             (let [result (do __SELECTION__)]
               __|(capture-values __ID__ result)|__
               result))

(rm/deffn console-log [exp result]
         (.log js/console (str "Watch: " exp " =>"))
         (.log js/console (clj->js result))
         result)

(rm/defwatch to-console-as-jsobj
             (let [exp (pr-str __SELECTION__)
                   result (do __SELECTION__)]
               __|(console-log exp result)|__
               result))

;; Provided by Beau Fabry
;; https://github.com/bfabry
;;
;; This watch provides a rough estimate of the executtion time of a function.
;; For more precise measurements a profiler should be used.
(rm/defwatch convenient-time
             (let [start (.getTime (js/Date.))
                   res (do __SELECTION__)]
               __|(str (- (.getTime (js/Date.)) start) " ms")|__
               res))

(rm/defwatch named-capture
             (let [res (do __SELECTION__)]
               (when-not __CAPTURENAME__
                 (def __CAPTURENAME__ (atom (capture res))))
               (reset! __CAPTURENAME__ res)
               __|(str "__CAPTURENAME__: " (pr-str res))|__
               res))
