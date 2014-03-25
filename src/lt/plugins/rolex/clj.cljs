(ns lt.plugins.rolex.clj
  (:require-macros [lt.plugins.rolex.macros :as rm]))

(rm/defn log-values [id v]
         (defonce WATCHLOG (atom {}))
         (swap! WATCHLOG update-in [id] (fnil conj []) v)
         (get (deref WATCHLOG) id "Watch not found"))

(rm/defwatch values-over-time
             (let [result (do __SELECTION__)
                   id __ID__]
               __|(log-values id result)|__
               result))
