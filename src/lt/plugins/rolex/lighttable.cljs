(ns lt.plugins.rolex.lighttable
  (:require [lt.object :as object]
            [lt.objs.editor.pool :as pool]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd]
            [lt.plugins.rolex.core :refer [ed->mime cljs-mime]]
            lt.plugins.rolex.compiler)
  (:require-macros [lt.macros :refer [defui behavior]]
                   [lt.plugins.rolex.macros :as rm]))

(rm/deff obj-keys #{:lt.object/type
                    :tags
                    :triggers
                    :listeners
                    :behaviors})

(rm/deffn ltobj? [x]
          (let [derefed (lt.plugins.rolex.core/->deref x)]
            (boolean
             (and (map? derefed)
                  (:lt.object/id derefed)))))

(rm/deffn summarize [obj]
          (if (ltobj? obj)
            (let [bins (group-by (comp boolean obj-keys first)
                                 (lt.plugins.rolex.core/->deref obj))
                  wrap (fn [v]
                         (if (lt.plugins.rolex.core/atom? obj)
                           (atom v)
                           v))]
              (-> (into {} (get bins true))
                  (assoc-in [:other-keys] (mapv first (get bins false)))
                  (wrap)))
            obj))


(rm/defwatch lt-obj-summary
             (let [result (do __SELECTION__)
                   display (if (sequential? result)
                             (mapv summarize result)
                             (summarize result))]
               __|display|__
               result))

(cmd/command {:command :rolex.watch.lt-objs-summary
              :desc "Rolex: Watch selection and summarize LT objects"
              :exec (fn []
                      (when-let [exp (condp = (ed->mime (pool/last-active))
                                       @cljs-mime lt-obj-summary
                                       nil)]
                        (cmd/exec! :editor.watch.custom-watch-selection (str exp))))})
