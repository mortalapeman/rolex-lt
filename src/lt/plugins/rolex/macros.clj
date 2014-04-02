(ns lt.plugins.rolex.macros)

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

(defmacro defwatch [sym & body]
  `(def ~sym
     (lt.plugins.rolex.compiler/inline '~@body ~(name (ns-name *ns*)))))
