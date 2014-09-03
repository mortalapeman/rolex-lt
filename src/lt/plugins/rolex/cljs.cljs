(ns lt.plugins.rolex.cljs
  (:require lt.plugins.rolex.compiler)
  (:require-macros [lt.plugins.rolex.macros :as rm]))

;; Generate fake ID for local function testing
(def __ID__ (str (gensym)))

(rm/deffn atom? [x]
  (when x
    (instance? Atom x)))

(rm/deffn ->deref [x]
  "Returns 'x' if is not an atom. Returns the value of 'x' if it is an atom."
  (if (atom? x) (deref x) x))

(rm/deffn capture [x]
  "Returns the given value if it not an atom. Returns a new
  atom with the value of the given atom if 'x' is an atom."
  (if (atom? x)
    (atom @x)
    x))

(rm/deffn capture-values [id x]
  "Returns the cumulartive value passed into this function
  for the given id."
  (when-not WATCHLOG
    (def WATCHLOG (atom {})))
  (swap! WATCHLOG update-in [id] (fnil conj []) x)
  (get @WATCHLOG id "Watch not found"))

(rm/deffn ->values-over-time [x]
  "Returns the cumulative values passed into this function
  as a collection using the global watch id of the current watch."
  (capture-values __ID__ x))


(rm/defwatch values-over-time
  (let [result (do __SELECTION__)]
    __|(->values-over-time result)|__
    result))


(rm/deffn console-log [exp result]
  (.log js/console (str "Watch: " exp " =>"))
  (.log js/console (clj->js result))
  result)

(rm/deffn ->console-log [x]
  (console-log (pr-str __SELECTION__) x))

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

(rm/deffn inc-watch-count []
  "Returns number of times this function has been run."
  (apply + (capture-values __ID__ 1)))

(rm/defwatch trace-count
  (let [res (do __SELECTION__)
        c (inc-watch-count)]
    __|(str "Hit count: " c)|__
    res))
