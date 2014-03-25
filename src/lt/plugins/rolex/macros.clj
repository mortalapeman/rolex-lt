(ns lt.plugins.rolex.macros
  (:refer-clojure :exclude [defn]))

(defmacro defn [sym args & body]
  `(do
     (swap! lt.plugins.rolex.compiler/interns
            assoc
            (symbol ~(name (ns-name *ns*))  ~(name sym))
            '(~(symbol "fn") ~args ~@body))
     (clojure.core/defn ~sym ~args ~@body)))

(defmacro deff [sym body]
  (let [source (if (list? body) `'~body body)]
    `(do
       (swap! lt.plugins.rolex.compiler/interns
              assoc
              (symbol ~(name (ns-name *ns*)) ~(name sym))
              ~source)
       (def ~sym ~body))))

(defmacro defwatch [sym & body]
  `(def ~sym
     (lt.plugins.rolex.compiler/inline '~@body ~(name (ns-name *ns*)))))


(macroexpand '(lt.plugins.rolex.macros/deff obj-keys #{lt.object/type
                   :tags
                   :triggers
                   :listeners
                   :behaviors}))
