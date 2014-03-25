(ns lt.plugins.rolex.macros)

(defmacro deffn [sym args & body]
  `(do
     (swap! lt.plugins.rolex.compiler/interns
            assoc
            (symbol ~(name (ns-name *ns*))  ~(name sym))
            '(~(symbol "fn") ~args ~@body))
     (defn ~sym ~args ~@body)))

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

