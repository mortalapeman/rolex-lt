(ns lt.plugins.rolex.macros
  (:require [lt.macros :refer [behavior]]
            [clojure.string :as string :refer [split]])
  (:refer-clojure :exclude [alias]))

(defmacro deffn [sym args & body]
  (let [nsname (name (ns-name *ns*))
        symname (name sym)
        fnsym 'fn]
    `(do
       (swap! lt.plugins.rolex.compiler/interns
              assoc
              (symbol ~nsname ~symname)
              (lt.plugins.rolex.compiler/inline '(~fnsym ~(gensym symname) ~args ~@(filter list? body))
                                                ~nsname))
       (defn ~sym ~args ~@body))))

(defmacro deff [sym form]
  `(let [result# ~form]
     (swap! lt.plugins.rolex.compiler/interns
            assoc
            (symbol ~(name (ns-name *ns*)) ~(name sym))
            result#)
     (def ~sym result#)))

(defmacro alias [a namespace-sym]
  `(swap! lt.plugins.rolex.compiler/aliases
          assoc
          '~(ns-name *ns*)
          {~a ~namespace-sym}))

(defmacro defwatch [sym & body]
  `(def ~sym
     (lt.plugins.rolex.compiler/inline '~@body ~(name (ns-name *ns*)))))

(defmacro lense [keyname & {:keys [alias desc cljs clj]}]
  `(behavior ~keyname
          :triggers #{:lense+}
          :desc ~desc
          :reaction (fn [this# lenses#]
                      (if-let [var# (condp = (lt.plugins.rolex.core/current-mime)
                                      @lt.plugins.rolex.core/cljs-mime '~cljs
                                      @lt.plugins.rolex.core/clj-mime '~clj)]
                        (assoc lenses# ~alias (get @lt.plugins.rolex.compiler/interns var#))
                        lenses#))))

