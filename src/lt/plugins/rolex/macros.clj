(ns lt.plugins.rolex.macros
  (:refer-clojure :exclude [defn]))

(defmacro defn [sym args & body]
  `(do
     (swap! lt.plugins.rolex.compile/interns
            assoc
            (symbol ~(str (ns-name *ns*) "/" (name sym)))
            '(~(symbol "fn") ~args ~@body))
     (clojure.core/defn ~sym ~args ~@body)))

(defmacro defwatch [sym & body]
  `(def ~sym
     (lt.plugins.rolex.compile/compile '~@body ~(name (ns-name *ns*)))))

(macroexpand-1 '(defn asdf [x] (do x)))
