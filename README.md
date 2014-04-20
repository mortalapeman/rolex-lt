## Rolex for Light Table

A collection of custom watches designed to aid your debugging efforts.

### Provided Watches

 - Rolex: Watch selection values over time (clj, cljs)
 - Rolex: Watch selection and log to console as js object (cljs)
 - Rolex: Watch selection and summarize LT objects (cljs)
 - Rolex: Watch selection and show estimated execution time (cljs, clj)

### Limitations

At the time of writing, custom watches are implemented for Clojure and ClojureScript only. Any attempt to use a custom watch in an evironment does not support the command with result in a noop.

#### Quick Start

At the time of writing, there are no facilities provided by Light Table that allow you to define your watches in a resuable and composable way. This project attempts to address that issue with a little macro magic.

 - **deff**: like def, but saves the source/value of the def
 - **deffn**: like defn, but saves the source code of the function

Referencing other functions/values def'd with deff or deffn works as expected:
```Clojure
(ns your.awesome.project
   (:require-macros [lt.plugins.rolex :refer [deffn deff defwatch]]))

(deff num 42)

(deffn add42 [x]
  (+ x num))

(add42 1) ;; => 43
```

 - **defwatch**: used to create a list of all inlined code

*Please note that \_\_SELECTION\_\_ is a Light Table custom watch variable*

```Clojure
(defwatch add42-watch
  (let [result (do __SELECTION__)
        display (if (number? result)
                  (add42 result)
                  result)]
    __|display|__
    result))
```

#### Lenses

Lenses provide composable watch filters so you can string your custom formating watch with the values over time watch. The provided lense aliases are listed below:

 - :->ltsummarize
 - :->values-over-time
 - :->console-log

**Ex:** Keymap binding to combine ltobject summarization and values over time

```
:editor {"alt-w" [(:rolex.watch.with-lenses :->ltsummarize :->values-over-time )]}
```

##### Defining a lense:

The lense macro is basically a light wrapper around the behavior macro.

```Clojure
;; Lenses require the fully qualified namespace of the var at this time.
(lense ::lense.values-over-time
       :cljs lt.plugins.rolex.cljs/->values-over-time
       :clj  lt.plugins.rolex.clj/->values-over-time
       :alias :->values-over-time
       :desc "Captures the sequence of values as they pass through the watch")
```

Then remember to add the generated behavior to the `:watch-lense` tag.


#### More Examples and Other Features

For more in depth examples and follow along code, checkout the [examples.cljs](https://github.com/mortalapeman/rolex-lt/blob/master/src/lt/plugins/rolex/examples.cljs)
file. Just fire up Light Table and hit Cmd-Shift-Enter.

### Contributing

This is still a work in progress, pull requests are always welcome.

### License

Copyright (C) 2014 by Eric Pritchett

Distributed under the GPLv3, see license.md for the full text.
