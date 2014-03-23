(ns lt.plugins.rolex.cljs
  (:require-macros [lt.plugins.rolex.macros :as rm]))

(rm/defn log-value [id x]
         (when-not WATCHLOG
           (def WATCHLOG (atom {})))
         (swap! WATCHLOG update-in [id] (fnil conj []) result)
         (get @WATCHLOG id "Watch not found"))

(rm/defwatch values-over-time
             (let [result (do __SELECTION__)]
               __|(log-value __ID__ result)|__
               result))
