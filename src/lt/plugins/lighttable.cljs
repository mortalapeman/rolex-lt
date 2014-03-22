(ns lt.plugins.rolex.lighttable
  (:require [lt.object :as object]
            [lt.objs.editor.pool :as pool]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd]
            [lt.plugins.rolex :refer [ed->mime cljs-mime]])
  (:require-macros [lt.macros :refer [defui behavior]]))


(def lt-obj-summary
  '(let [obj-keys #{:lt.object/type
                    :tags
                    :triggers
                    :listeners
                    :behaviors}
         safe-deref (fn [v]
                      (if (instance? Atom v)
                        (deref v)
                        v))
         ltobj? (fn [v]
                  (let [derefed (safe-deref v)]
                    (boolean
                     (and (map? derefed)
                          (:lt.object/id derefed)))))
         summarize (fn [obj]
                     (if (ltobj? obj)
                       (let [bins (group-by (comp boolean obj-keys first)
                                            (safe-deref obj))
                             wrap (fn [v]
                                    (if (instance? Atom obj)
                                      (atom v)
                                      v))]
                         (-> (into {} (get bins true))
                             (assoc-in [:other-keys] (mapv first (get bins false)))
                             (wrap)))
                       obj))
         result (do __SELECTION__)]
     __|(if (sequential? result)
          (mapv summarize result)
          (summarize result))|__
     result))


(cmd/command {:command :rolex.watch.lt-objs-summary
              :desc "Rolex: Watch selection and summarize LT objects"
              :exec (fn []
                      (when-let [exp (condp = (ed->mime (pool/last-active))
                                       @cljs-mime lt-obj-summary
                                       nil)]
                        (cmd/exec! :editor.watch.custom-watch-selection (str exp))))})
