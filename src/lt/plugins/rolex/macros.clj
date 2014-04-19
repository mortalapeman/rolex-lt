(ns lt.plugins.rolex.macros
  (:require [lt.macros :refer [behavior]])
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


(defmacro lense [keyname sym]
  `(behavior ~keyname
          :triggers #{:lense+}
          :reaction (fn [this# lenses#]
                      (assoc lenses#
                             ~(keyword (str sym))
                             (get @lt.plugins.rolex.compiler/interns '~sym)))))

