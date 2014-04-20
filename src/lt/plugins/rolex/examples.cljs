(ns lt.plugins.rolex.examples
  (:require [lt.plugins.rolex.core :as core]
            [lt.plugins.rolex.compiler :as compiler]
            [lt.plugins.rolex.cljs :as cljs :refer [atom?]])
  (:require-macros [lt.plugins.rolex.macros :refer [lense deffn deff alias defwatch]]))

;; Helper function for later examples
(defn inline [form]
  (compiler/inline form "lt.plugins.rolex.examples"))


;; deff and deffn work just like the normal def/defn macros, except that they
;; capture the value/source of thier def.
(deff the-answer 42)

the-answer
; => 42


;; The compiler namespace includes all the functions and state associated
;; with the values/source created by deff/deffn
(inline '(do the-answer))
; => (do 42)

(deffn add-the-answer [x]
  (+ the-answer x))

;; All vars are inlined into the current form. This is done because
;; when a Light Table watch is evaluated, it is evaluated in the current
;; namespace and may not have access to the lt.plugins.rolex.compiler/interns
;; var. We have to build the code up, ready to be evaluated in any project.
(inline '(do (add-the-answer 1)))
; => (do ((fn add-the-answer8764 [x] (+ 42 x)) 1))


;; Custom watches are defined with a few evironment variables provided by
;; Light Table: __SELECTION__, __SELECTION*__ and __ID__.
;;
;; All the examples on the mailing list have your defining
;; custom watches in string form, but there is not reason we can't define
;; them as code and make them strings later. Rolex provides the defwatch
;; macro to help with this.
(defwatch add-the-answer-watch
  (let [result (do __SELECTION__)
        display (if (number? result)
                  (add-the-answer result)
                  result)]
    __|display|__
    result))

add-the-answer-watch
;; => (let [result (do __SELECTION__)
;;          display (if (number? result)
;;                    ((fn add-the-answer8764 [x] (+ 42 x)) result)
;;                    result)]
;;      __|display|__
;;      result)



;; At the time of writing, only aliases are supported in deff and deffn
;; and require the use of the Rolex's alias macro.
(alias 'cljs 'lt.plugins.rolex.cljs)

(inline
  '(do
    (atom? num) ;; Bad: refer unsupported
    (cljs/atom? num))) ;; Good: alias supported

alias-example
;; => (do (atom? num) ((fn atom?8811 [x] (when x (instance? Atom x))) num))


;; TODO: Lenses
;;
;; Lenses are basically just a function with one arg that transforms a value
;; and then passes it on to the next lense. They can be composed with the :rolex.watch.with-lenses
;; command.
;;
;; The lense macro is basicaly just a wrapper around the behavior macro to make defining them
;; a little easier.
;;
;; Ex: Keymap binding to combine ltobject summarization and values over time
;;
;;   :editor {"alt-w" [(:rolex.watch.with-lenses :->ltsummarize :->values-over-time )]}
