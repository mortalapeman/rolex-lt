if(!lt.util.load.provided_QMARK_('clojure.walk')) {
goog.provide('clojure.walk');
goog.require('cljs.core');
/**
* Traverses form, an arbitrary data structure.  inner and outer are
* functions.  Applies inner to each element of form, building up a
* data structure of the same type, then applies outer to the result.
* Recognizes all Clojure data structures. Consumes seqs as with doall.
*/
clojure.walk.walk = (function walk(inner,outer,form){if(cljs.core.seq_QMARK_.call(null,form))
{return outer.call(null,cljs.core.doall.call(null,cljs.core.map.call(null,inner,form)));
} else
{if(cljs.core.coll_QMARK_.call(null,form))
{return outer.call(null,cljs.core.into.call(null,cljs.core.empty.call(null,form),cljs.core.map.call(null,inner,form)));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return outer.call(null,form);
} else
{return null;
}
}
}
});
/**
* Performs a depth-first, post-order traversal of form.  Calls f on
* each sub-form, uses f's return value in place of the original.
* Recognizes all Clojure data structures. Consumes seqs as with doall.
*/
clojure.walk.postwalk = (function postwalk(f,form){return clojure.walk.walk.call(null,cljs.core.partial.call(null,postwalk,f),f,form);
});
/**
* Like postwalk, but does pre-order traversal.
*/
clojure.walk.prewalk = (function prewalk(f,form){return clojure.walk.walk.call(null,cljs.core.partial.call(null,prewalk,f),cljs.core.identity,f.call(null,form));
});
/**
* Recursively transforms all map keys from strings to keywords.
*/
clojure.walk.keywordize_keys = (function keywordize_keys(m){var f = (function (p__7991){var vec__7992 = p__7991;var k = cljs.core.nth.call(null,vec__7992,0,null);var v = cljs.core.nth.call(null,vec__7992,1,null);if(typeof k === 'string')
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,k),v], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null);
}
});return clojure.walk.postwalk.call(null,((function (f){
return (function (x){if(cljs.core.map_QMARK_.call(null,x))
{return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,f,x));
} else
{return x;
}
});})(f))
,m);
});
/**
* Recursively transforms all map keys from keywords to strings.
*/
clojure.walk.stringify_keys = (function stringify_keys(m){var f = (function (p__7995){var vec__7996 = p__7995;var k = cljs.core.nth.call(null,vec__7996,0,null);var v = cljs.core.nth.call(null,vec__7996,1,null);if((k instanceof cljs.core.Keyword))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name.call(null,k),v], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null);
}
});return clojure.walk.postwalk.call(null,((function (f){
return (function (x){if(cljs.core.map_QMARK_.call(null,x))
{return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,f,x));
} else
{return x;
}
});})(f))
,m);
});
/**
* Recursively transforms form by replacing keys in smap with their
* values.  Like clojure/replace but works on any data structure.  Does
* replacement at the root of the tree first.
*/
clojure.walk.prewalk_replace = (function prewalk_replace(smap,form){return clojure.walk.prewalk.call(null,(function (x){if(cljs.core.contains_QMARK_.call(null,smap,x))
{return smap.call(null,x);
} else
{return x;
}
}),form);
});
/**
* Recursively transforms form by replacing keys in smap with their
* values.  Like clojure/replace but works on any data structure.  Does
* replacement at the leaves of the tree first.
*/
clojure.walk.postwalk_replace = (function postwalk_replace(smap,form){return clojure.walk.postwalk.call(null,(function (x){if(cljs.core.contains_QMARK_.call(null,smap,x))
{return smap.call(null,x);
} else
{return x;
}
}),form);
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.rolex.compiler')) {
goog.provide('lt.plugins.rolex.compiler');
goog.require('cljs.core');
goog.require('clojure.walk');
goog.require('clojure.walk');
lt.plugins.rolex.compiler.interns = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Symbol("clojure.core","deref","clojure.core/deref",-564909588,null),new cljs.core.Symbol(null,"deref","deref",-1545057749,null)], null));
lt.plugins.rolex.compiler.aliases = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
lt.plugins.rolex.compiler.__GT_alias = (function __GT_alias(sym,current_ns){if((sym instanceof cljs.core.Symbol))
{return cljs.core.get_in.call(null,cljs.core.deref.call(null,lt.plugins.rolex.compiler.aliases),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.symbol.call(null,current_ns),cljs.core.symbol.call(null,cljs.core.namespace.call(null,sym))], null));
} else
{return null;
}
});
lt.plugins.rolex.compiler.resolve_alias = (function resolve_alias(sym,current_ns){var temp__4092__auto__ = lt.plugins.rolex.compiler.__GT_alias.call(null,sym,current_ns);if(cljs.core.truth_(temp__4092__auto__))
{var ns = temp__4092__auto__;return cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.rolex.compiler.interns),cljs.core.symbol.call(null,[cljs.core.str(ns)].join(''),cljs.core.name.call(null,sym)));
} else
{return null;
}
});
lt.plugins.rolex.compiler.resolve_with_current_ns = (function resolve_with_current_ns(sym,ns){if((sym instanceof cljs.core.Symbol))
{return cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.rolex.compiler.interns),cljs.core.symbol.call(null,ns,cljs.core.name.call(null,sym)));
} else
{return null;
}
});
lt.plugins.rolex.compiler.inline = (function inline(form,current_ns){var transform = (function transform(x){var temp__4090__auto__ = (function (){var or__6364__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.rolex.compiler.interns),x);if(cljs.core.truth_(or__6364__auto__))
{return or__6364__auto__;
} else
{var or__6364__auto____$1 = lt.plugins.rolex.compiler.resolve_alias.call(null,x,current_ns);if(cljs.core.truth_(or__6364__auto____$1))
{return or__6364__auto____$1;
} else
{return lt.plugins.rolex.compiler.resolve_with_current_ns.call(null,x,current_ns);
}
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var s = temp__4090__auto__;return inline.call(null,s,current_ns);
} else
{return x;
}
});
return clojure.walk.postwalk.call(null,transform,form);
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.rolex.cljs')) {
goog.provide('lt.plugins.rolex.cljs');
goog.require('cljs.core');
goog.require('lt.plugins.rolex.compiler');
lt.plugins.rolex.cljs.__ID__ = [cljs.core.str(cljs.core.gensym.call(null))].join('');
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.cljs","atom?"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"atom?8343","atom?8343",-1953247615,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-1640531407,null)], null),cljs.core.list(new cljs.core.Symbol(null,"when","when",-1636883213,null),new cljs.core.Symbol(null,"x","x",-1640531407,null),cljs.core.list(new cljs.core.Symbol(null,"instance?","instance?",-1611433981,null),new cljs.core.Symbol(null,"Atom","Atom",-1638480086,null),new cljs.core.Symbol(null,"x","x",-1640531407,null)))),"lt.plugins.rolex.cljs"));
lt.plugins.rolex.cljs.atom_QMARK_ = (function atom_QMARK_(x){if(cljs.core.truth_(x))
{return (x instanceof cljs.core.Atom);
} else
{return null;
}
});
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.cljs","->deref"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"->deref8344","->deref8344",459132245,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-1640531407,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",-1640528170,null),cljs.core.list(new cljs.core.Symbol(null,"atom?","atom?",-1547384121,null),new cljs.core.Symbol(null,"x","x",-1640531407,null)),cljs.core.list(new cljs.core.Symbol(null,"deref","deref",-1545057749,null),new cljs.core.Symbol(null,"x","x",-1640531407,null)),new cljs.core.Symbol(null,"x","x",-1640531407,null))),"lt.plugins.rolex.cljs"));
lt.plugins.rolex.cljs.__GT_deref = (function __GT_deref(x){if(cljs.core.truth_(lt.plugins.rolex.cljs.atom_QMARK_.call(null,x)))
{return cljs.core.deref.call(null,x);
} else
{return x;
}
});
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.cljs","capture"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"capture8345","capture8345",-1478465349,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-1640531407,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",-1640528170,null),cljs.core.list(new cljs.core.Symbol(null,"atom?","atom?",-1547384121,null),new cljs.core.Symbol(null,"x","x",-1640531407,null)),cljs.core.list(new cljs.core.Symbol(null,"atom","atom",-1637526774,null),cljs.core.list(new cljs.core.Symbol("clojure.core","deref","clojure.core/deref",-564909588,null),new cljs.core.Symbol(null,"x","x",-1640531407,null))),new cljs.core.Symbol(null,"x","x",-1640531407,null))),"lt.plugins.rolex.cljs"));
lt.plugins.rolex.cljs.capture = (function capture(x){if(cljs.core.truth_(lt.plugins.rolex.cljs.atom_QMARK_.call(null,x)))
{return cljs.core.atom.call(null,cljs.core.deref.call(null,x));
} else
{return x;
}
});
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.cljs","capture-values"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"capture-values8346","capture-values8346",-1157337729,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"id","id",-1640528172,null),new cljs.core.Symbol(null,"x","x",-1640531407,null)], null),cljs.core.list(new cljs.core.Symbol(null,"when-not","when-not",401151865,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),cljs.core.list(new cljs.core.Symbol(null,"def","def",-1640432194,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),cljs.core.list(new cljs.core.Symbol(null,"atom","atom",-1637526774,null),cljs.core.PersistentArrayMap.EMPTY))),cljs.core.list(new cljs.core.Symbol(null,"swap!","swap!",-1530684761,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),new cljs.core.Symbol(null,"update-in","update-in",705189474,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"id","id",-1640528172,null)], null),cljs.core.list(new cljs.core.Symbol(null,"fnil","fnil",-1637383772,null),new cljs.core.Symbol(null,"conj","conj",-1637472031,null),cljs.core.PersistentVector.EMPTY),new cljs.core.Symbol(null,"x","x",-1640531407,null)),cljs.core.list(new cljs.core.Symbol(null,"get","get",-1640429297,null),cljs.core.list(new cljs.core.Symbol("clojure.core","deref","clojure.core/deref",-564909588,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null)),new cljs.core.Symbol(null,"id","id",-1640528172,null),"Watch not found")),"lt.plugins.rolex.cljs"));
lt.plugins.rolex.cljs.capture_values = (function capture_values(id,x){if(cljs.core.truth_(lt.plugins.rolex.cljs.WATCHLOG))
{} else
{lt.plugins.rolex.cljs.WATCHLOG = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.cljs.WATCHLOG,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [id], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),x);
return cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.rolex.cljs.WATCHLOG),id,"Watch not found");
});
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.cljs","->values-over-time"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"->values-over-time8347","->values-over-time8347",-268633245,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-1640531407,null)], null),cljs.core.list(new cljs.core.Symbol(null,"capture-values","capture-values",-281403582,null),new cljs.core.Symbol(null,"__ID__","__ID__",1169215444,null),new cljs.core.Symbol(null,"x","x",-1640531407,null))),"lt.plugins.rolex.cljs"));
lt.plugins.rolex.cljs.__GT_values_over_time = (function __GT_values_over_time(x){return lt.plugins.rolex.cljs.capture_values.call(null,lt.plugins.rolex.cljs.__ID__,x);
});
lt.plugins.rolex.cljs.values_over_time = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"result","result",1720009174,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null))], null),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"->values-over-time","->values-over-time",-1307371867,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),"lt.plugins.rolex.cljs");
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.cljs","console-log"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"console-log8348","console-log8348",-1302292666,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"exp","exp",-1640430634,null),new cljs.core.Symbol(null,"result","result",1720009174,null)], null),cljs.core.list(new cljs.core.Symbol(null,".log",".log",-1639053809,null),new cljs.core.Symbol("js","console","js/console",-688801301,null),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),"Watch: ",new cljs.core.Symbol(null,"exp","exp",-1640430634,null)," =>")),cljs.core.list(new cljs.core.Symbol(null,".log",".log",-1639053809,null),new cljs.core.Symbol("js","console","js/console",-688801301,null),cljs.core.list(new cljs.core.Symbol(null,"clj->js","clj->js",-780735212,null),new cljs.core.Symbol(null,"result","result",1720009174,null)))),"lt.plugins.rolex.cljs"));
lt.plugins.rolex.cljs.console_log = (function console_log(exp,result){console.log([cljs.core.str("Watch: "),cljs.core.str(exp),cljs.core.str(" =>")].join(''));
console.log(cljs.core.clj__GT_js.call(null,result));
return result;
});
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.cljs","->console-log"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"->console-log8349","->console-log8349",-2121246346,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-1640531407,null)], null),cljs.core.list(new cljs.core.Symbol(null,"console-log","console-log",735310727,null),cljs.core.list(new cljs.core.Symbol(null,"pr-str","pr-str",1672669599,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null)),new cljs.core.Symbol(null,"x","x",-1640531407,null))),"lt.plugins.rolex.cljs"));
lt.plugins.rolex.cljs.__GT_console_log = (function __GT_console_log(x){return lt.plugins.rolex.cljs.console_log.call(null,cljs.core.pr_str.call(null,lt.plugins.rolex.cljs.__SELECTION__),x);
});
lt.plugins.rolex.cljs.to_console_as_jsobj = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"exp","exp",-1640430634,null),cljs.core.list(new cljs.core.Symbol(null,"pr-str","pr-str",1672669599,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null)),new cljs.core.Symbol(null,"result","result",1720009174,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null))], null),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"console-log","console-log",735310727,null),new cljs.core.Symbol(null,"exp","exp",-1640430634,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),"lt.plugins.rolex.cljs");
lt.plugins.rolex.cljs.convenient_time = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"start","start",-1530773989,null),cljs.core.list(new cljs.core.Symbol(null,".getTime",".getTime",1144210702,null),cljs.core.list(new cljs.core.Symbol("js","Date.","js/Date.",-1574508510,null))),new cljs.core.Symbol(null,"res","res",-1640418727,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null))], null),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),cljs.core.list(new cljs.core.Symbol(null,"-","-",-1640531482,null),cljs.core.list(new cljs.core.Symbol(null,".getTime",".getTime",1144210702,null),cljs.core.list(new cljs.core.Symbol("js","Date.","js/Date.",-1574508510,null))),new cljs.core.Symbol(null,"start","start",-1530773989,null))," ms"),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"res","res",-1640418727,null)),"lt.plugins.rolex.cljs");
lt.plugins.rolex.cljs.named_capture = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"res","res",-1640418727,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null))], null),cljs.core.list(new cljs.core.Symbol(null,"when-not","when-not",401151865,null),new cljs.core.Symbol(null,"__CAPTURENAME__","__CAPTURENAME__",597794858,null),cljs.core.list(new cljs.core.Symbol(null,"def","def",-1640432194,null),new cljs.core.Symbol(null,"__CAPTURENAME__","__CAPTURENAME__",597794858,null),cljs.core.list(new cljs.core.Symbol(null,"atom","atom",-1637526774,null),cljs.core.list(new cljs.core.Symbol(null,"capture","capture",-1087946497,null),new cljs.core.Symbol(null,"res","res",-1640418727,null))))),cljs.core.list(new cljs.core.Symbol(null,"reset!","reset!",1719993963,null),new cljs.core.Symbol(null,"__CAPTURENAME__","__CAPTURENAME__",597794858,null),new cljs.core.Symbol(null,"res","res",-1640418727,null)),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),"__CAPTURENAME__: ",cljs.core.list(new cljs.core.Symbol(null,"pr-str","pr-str",1672669599,null),new cljs.core.Symbol(null,"res","res",-1640418727,null))),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"res","res",-1640418727,null)),"lt.plugins.rolex.cljs");
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.cljs","inc-watch-count"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"inc-watch-count8350","inc-watch-count8350",1837970097,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol(null,"apply","apply",-1547502297,null),new cljs.core.Symbol(null,"+","+",-1640531484,null),cljs.core.list(new cljs.core.Symbol(null,"capture-values","capture-values",-281403582,null),new cljs.core.Symbol(null,"__ID__","__ID__",1169215444,null),1))),"lt.plugins.rolex.cljs"));
lt.plugins.rolex.cljs.inc_watch_count = (function inc_watch_count(){return cljs.core.apply.call(null,cljs.core._PLUS_,lt.plugins.rolex.cljs.capture_values.call(null,lt.plugins.rolex.cljs.__ID__,1));
});
lt.plugins.rolex.cljs.trace_count = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"res","res",-1640418727,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null)),new cljs.core.Symbol(null,"c","c",-1640531428,null),cljs.core.list(new cljs.core.Symbol(null,"inc-watch-count","inc-watch-count",245061851,null))], null),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),"Hit count: ",new cljs.core.Symbol(null,"c","c",-1640531428,null)),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"res","res",-1640418727,null)),"lt.plugins.rolex.cljs");
}
if(!lt.util.load.provided_QMARK_('lt.plugins.rolex.core')) {
goog.provide('lt.plugins.rolex.core');
goog.require('cljs.core');
goog.require('lt.plugins.rolex.compiler');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.files');
goog.require('lt.objs.files');
lt.plugins.rolex.core.delayed_mime = (function delayed_mime(name){return (new cljs.core.Delay(cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"done","done",1016993524),false,new cljs.core.Keyword(null,"value","value",1125876963),null], null)),(function (){return new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.files.files_obj)),name));
})));
});
lt.plugins.rolex.core.ed__GT_mime = (function ed__GT_mime(editor){return new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)));
});
lt.plugins.rolex.core.cljs_mime = lt.plugins.rolex.core.delayed_mime.call(null,"ClojureScript");
lt.plugins.rolex.core.clj_mime = lt.plugins.rolex.core.delayed_mime.call(null,"Clojure");
lt.plugins.rolex.core.current_mime = (function current_mime(){return lt.plugins.rolex.core.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.rolex.lighttable')) {
goog.provide('lt.plugins.rolex.lighttable');
goog.require('cljs.core');
goog.require('lt.plugins.rolex.core');
goog.require('lt.objs.files');
goog.require('lt.plugins.rolex.cljs');
goog.require('lt.plugins.rolex.core');
goog.require('lt.plugins.rolex.compiler');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.objs.files');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.plugins.rolex.cljs');
var result__7862__auto___8438 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"behaviors","behaviors",607554515),null,new cljs.core.Keyword("lt.object","type","lt.object/type",701613666),null,new cljs.core.Keyword(null,"listeners","listeners",4090152369),null,new cljs.core.Keyword(null,"triggers","triggers",2516997421),null,new cljs.core.Keyword(null,"tags","tags",1017456523),null], null), null);cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.lighttable","obj-keys"),result__7862__auto___8438);
lt.plugins.rolex.lighttable.obj_keys = result__7862__auto___8438;
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.aliases,cljs.core.assoc,new cljs.core.Symbol(null,"lt.plugins.rolex.lighttable","lt.plugins.rolex.lighttable",-941321455,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Symbol(null,"cljs","cljs",-1637475029,null),new cljs.core.Symbol(null,"lt.plugins.rolex.cljs","lt.plugins.rolex.cljs",150706699,null)], null));
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.lighttable","ltobj?"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"ltobj?8432","ltobj?8432",-546415676,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-1640531407,null)], null),cljs.core.list(new cljs.core.Symbol(null,"when-let","when-let",401149633,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"derefed","derefed",-84540854,null),cljs.core.list(new cljs.core.Symbol("cljs","->deref","cljs/->deref",1708069636,null),new cljs.core.Symbol(null,"x","x",-1640531407,null))], null),cljs.core.list(new cljs.core.Symbol(null,"boolean","boolean",-1575819807,null),cljs.core.list(new cljs.core.Symbol(null,"and","and",-1640434800,null),cljs.core.list(new cljs.core.Symbol(null,"map?","map?",-1637187556,null),new cljs.core.Symbol(null,"derefed","derefed",-84540854,null)),cljs.core.list(new cljs.core.Keyword("lt.object","id","lt.object/id",706431105),new cljs.core.Symbol(null,"derefed","derefed",-84540854,null)))))),"lt.plugins.rolex.lighttable"));
lt.plugins.rolex.lighttable.ltobj_QMARK_ = (function ltobj_QMARK_(x){var temp__4092__auto__ = lt.plugins.rolex.cljs.__GT_deref.call(null,x);if(cljs.core.truth_(temp__4092__auto__))
{var derefed = temp__4092__auto__;return cljs.core.boolean$.call(null,(function (){var and__6352__auto__ = cljs.core.map_QMARK_.call(null,derefed);if(and__6352__auto__)
{return new cljs.core.Keyword("lt.object","id","lt.object/id",706431105).cljs$core$IFn$_invoke$arity$1(derefed);
} else
{return and__6352__auto__;
}
})());
} else
{return null;
}
});
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.lighttable","summarize"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"summarize8433","summarize8433",-1469818666,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"obj","obj",-1640421712,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",-1640528170,null),cljs.core.list(new cljs.core.Symbol(null,"ltobj?","ltobj?",1561949545,null),new cljs.core.Symbol(null,"obj","obj",-1640421712,null)),cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"bins","bins",-1637507579,null),cljs.core.list(new cljs.core.Symbol(null,"group-by","group-by",-1134218210,null),cljs.core.list(new cljs.core.Symbol(null,"comp","comp",-1637472056,null),new cljs.core.Symbol(null,"boolean","boolean",-1575819807,null),new cljs.core.Symbol(null,"obj-keys","obj-keys",-1601528125,null),new cljs.core.Symbol(null,"first","first",-1543091095,null)),cljs.core.list(new cljs.core.Symbol("cljs","->deref","cljs/->deref",1708069636,null),new cljs.core.Symbol(null,"obj","obj",-1640421712,null))),new cljs.core.Symbol(null,"wrap","wrap",-1636873725,null),cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"v","v",-1640531409,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",-1640528170,null),cljs.core.list(new cljs.core.Symbol("cljs","atom?","cljs/atom?",-1353190575,null),new cljs.core.Symbol(null,"obj","obj",-1640421712,null)),cljs.core.list(new cljs.core.Symbol(null,"atom","atom",-1637526774,null),new cljs.core.Symbol(null,"v","v",-1640531409,null)),new cljs.core.Symbol(null,"v","v",-1640531409,null)))], null),cljs.core.list(new cljs.core.Symbol(null,"->","->",-1640530070,null),cljs.core.list(new cljs.core.Symbol(null,"into","into",-1637294055,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Symbol(null,"get","get",-1640429297,null),new cljs.core.Symbol(null,"bins","bins",-1637507579,null),true)),cljs.core.list(new cljs.core.Symbol(null,"assoc-in","assoc-in",-2005053546,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"other-keys","other-keys",785231363)], null),cljs.core.list(new cljs.core.Symbol(null,"mapv","mapv",-1637187501,null),new cljs.core.Symbol(null,"first","first",-1543091095,null),cljs.core.list(new cljs.core.Symbol(null,"get","get",-1640429297,null),new cljs.core.Symbol(null,"bins","bins",-1637507579,null),false))),cljs.core.list(new cljs.core.Symbol(null,"wrap","wrap",-1636873725,null)))),new cljs.core.Symbol(null,"obj","obj",-1640421712,null))),"lt.plugins.rolex.lighttable"));
lt.plugins.rolex.lighttable.summarize = (function summarize(obj){if(cljs.core.truth_(lt.plugins.rolex.lighttable.ltobj_QMARK_.call(null,obj)))
{var bins = cljs.core.group_by.call(null,cljs.core.comp.call(null,cljs.core.boolean$,lt.plugins.rolex.lighttable.obj_keys,cljs.core.first),lt.plugins.rolex.cljs.__GT_deref.call(null,obj));var wrap = ((function (bins){
return (function (v){if(cljs.core.truth_(lt.plugins.rolex.cljs.atom_QMARK_.call(null,obj)))
{return cljs.core.atom.call(null,v);
} else
{return v;
}
});})(bins))
;return wrap.call(null,cljs.core.assoc_in.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.get.call(null,bins,true)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"other-keys","other-keys",785231363)], null),cljs.core.mapv.call(null,cljs.core.first,cljs.core.get.call(null,bins,false))));
} else
{return obj;
}
});
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.lighttable","->summarize"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"->summarize8434","->summarize8434",665639622,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"obj","obj",-1640421712,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",-1640528170,null),cljs.core.list(new cljs.core.Symbol(null,"sequential?","sequential?",1865038041,null),new cljs.core.Symbol(null,"obj","obj",-1640421712,null)),cljs.core.list(new cljs.core.Symbol(null,"mapv","mapv",-1637187501,null),new cljs.core.Symbol(null,"summarize","summarize",-126704902,null),new cljs.core.Symbol(null,"obj","obj",-1640421712,null)),cljs.core.list(new cljs.core.Symbol(null,"summarize","summarize",-126704902,null),new cljs.core.Symbol(null,"obj","obj",-1640421712,null)))),"lt.plugins.rolex.lighttable"));
lt.plugins.rolex.lighttable.__GT_summarize = (function __GT_summarize(obj){if(cljs.core.sequential_QMARK_.call(null,obj))
{return cljs.core.mapv.call(null,lt.plugins.rolex.lighttable.summarize,obj);
} else
{return lt.plugins.rolex.lighttable.summarize.call(null,obj);
}
});
lt.plugins.rolex.lighttable.lt_obj_summary = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"result","result",1720009174,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null)),new cljs.core.Symbol(null,"display","display",31232635,null),cljs.core.list(new cljs.core.Symbol(null,"->summarize","->summarize",1315927145,null),new cljs.core.Symbol(null,"result","result",1720009174,null))], null),new cljs.core.Symbol(null,"__|display|__","__|display|__",-469250897,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),"lt.plugins.rolex.lighttable");
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.lt-objs-summary","rolex.watch.lt-objs-summary",4009330561),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Watch selection and summarize LT objects",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = (function (){var pred__8435 = cljs.core._EQ_;var expr__8436 = lt.plugins.rolex.core.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));if(cljs.core.truth_(pred__8435.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8436)))
{return lt.plugins.rolex.lighttable.lt_obj_summary;
} else
{return null;
}
})();if(cljs.core.truth_(temp__4092__auto__))
{var exp = temp__4092__auto__;return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.watch.custom-watch-selection","editor.watch.custom-watch-selection",3503983620),[cljs.core.str(exp)].join(''));
} else
{return null;
}
})], null));
}
if(!lt.util.load.provided_QMARK_('lt.plugins.rolex.clj')) {
goog.provide('lt.plugins.rolex.clj');
goog.require('cljs.core');
goog.require('lt.plugins.rolex.compiler');
lt.plugins.rolex.clj.__ID__ = [cljs.core.str(cljs.core.gensym.call(null))].join('');
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.clj","capture-values"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"capture-values8429","capture-values8429",-1157336827,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"id","id",-1640528172,null),new cljs.core.Symbol(null,"v","v",-1640531409,null)], null),cljs.core.list(new cljs.core.Symbol(null,"defonce","defonce",-95317569,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),cljs.core.list(new cljs.core.Symbol(null,"atom","atom",-1637526774,null),cljs.core.PersistentArrayMap.EMPTY)),cljs.core.list(new cljs.core.Symbol(null,"swap!","swap!",-1530684761,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),new cljs.core.Symbol(null,"update-in","update-in",705189474,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"id","id",-1640528172,null)], null),cljs.core.list(new cljs.core.Symbol(null,"fnil","fnil",-1637383772,null),new cljs.core.Symbol(null,"conj","conj",-1637472031,null),cljs.core.PersistentVector.EMPTY),new cljs.core.Symbol(null,"v","v",-1640531409,null)),cljs.core.list(new cljs.core.Symbol(null,"get","get",-1640429297,null),cljs.core.list(new cljs.core.Symbol("clojure.core","deref","clojure.core/deref",-564909588,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null)),new cljs.core.Symbol(null,"id","id",-1640528172,null),"Watch not found")),"lt.plugins.rolex.clj"));
lt.plugins.rolex.clj.capture_values = (function capture_values(id,v){if(typeof lt.plugins.rolex.clj.WATCHLOG !== 'undefined')
{} else
{lt.plugins.rolex.clj.WATCHLOG = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.clj.WATCHLOG,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [id], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),v);
return cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.rolex.clj.WATCHLOG),id,"Watch not found");
});
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.clj","->values-over-time"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"->values-over-time8430","->values-over-time8430",-268632322,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-1640531407,null)], null),cljs.core.list(new cljs.core.Symbol(null,"capture-values","capture-values",-281403582,null),new cljs.core.Symbol(null,"__ID__","__ID__",1169215444,null),new cljs.core.Symbol(null,"x","x",-1640531407,null))),"lt.plugins.rolex.clj"));
lt.plugins.rolex.clj.__GT_values_over_time = (function __GT_values_over_time(x){return lt.plugins.rolex.clj.capture_values.call(null,lt.plugins.rolex.clj.__ID__,x);
});
lt.plugins.rolex.clj.values_over_time = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"result","result",1720009174,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null))], null),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"->values-over-time","->values-over-time",-1307371867,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),"lt.plugins.rolex.clj");
lt.plugins.rolex.clj.convenient_time = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"start","start",-1530773989,null),cljs.core.list(new cljs.core.Symbol("System","currentTimeMillis","System/currentTimeMillis",-1796581225,null)),new cljs.core.Symbol(null,"res","res",-1640418727,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null))], null),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),cljs.core.list(new cljs.core.Symbol(null,"-","-",-1640531482,null),cljs.core.list(new cljs.core.Symbol("System","currentTimeMillis","System/currentTimeMillis",-1796581225,null)),new cljs.core.Symbol(null,"start","start",-1530773989,null))," ms"),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"res","res",-1640418727,null)),"lt.plugins.rolex.clj");
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.clj","inc-watch-count"),lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"inc-watch-count8431","inc-watch-count8431",1837970997,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol(null,"apply","apply",-1547502297,null),new cljs.core.Symbol(null,"+","+",-1640531484,null),cljs.core.list(new cljs.core.Symbol(null,"capture-values","capture-values",-281403582,null),new cljs.core.Symbol(null,"__ID__","__ID__",1169215444,null),1))),"lt.plugins.rolex.clj"));
lt.plugins.rolex.clj.inc_watch_count = (function inc_watch_count(){return cljs.core.apply.call(null,cljs.core._PLUS_,lt.plugins.rolex.clj.capture_values.call(null,lt.plugins.rolex.clj.__ID__,1));
});
lt.plugins.rolex.clj.trace_count = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"res","res",-1640418727,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null)),new cljs.core.Symbol(null,"c","c",-1640531428,null),cljs.core.list(new cljs.core.Symbol(null,"inc-watch-count","inc-watch-count",245061851,null))], null),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),"Hit count: ",new cljs.core.Symbol(null,"c","c",-1640531428,null)),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"res","res",-1640418727,null)),"lt.plugins.rolex.clj");
}
if(!lt.util.load.provided_QMARK_('lt.plugins.rolex')) {
goog.provide('lt.plugins.rolex');
goog.require('cljs.core');
goog.require('lt.plugins.rolex.core');
goog.require('lt.plugins.rolex.clj');
goog.require('lt.util.dom');
goog.require('lt.objs.context');
goog.require('lt.plugins.rolex.cljs');
goog.require('lt.plugins.rolex.core');
goog.require('lt.plugins.rolex.compiler');
goog.require('lt.plugins.rolex.clj');
goog.require('lt.objs.popup');
goog.require('lt.objs.popup');
goog.require('lt.objs.context');
goog.require('lt.util.dom');
goog.require('lt.objs.editor.pool');
goog.require('clojure.string');
goog.require('lt.plugins.rolex.lighttable');
goog.require('lt.objs.command');
goog.require('clojure.string');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.plugins.rolex.lighttable');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.plugins.rolex.compiler');
goog.require('lt.plugins.rolex.cljs');
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.values-over-time","rolex.watch.values-over-time",3678471320),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Watch selection values over time",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = (function (){var pred__8388 = cljs.core._EQ_;var expr__8389 = lt.plugins.rolex.core.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));if(cljs.core.truth_(pred__8388.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8389)))
{return lt.plugins.rolex.cljs.values_over_time;
} else
{if(cljs.core.truth_(pred__8388.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.clj_mime),expr__8389)))
{return lt.plugins.rolex.clj.values_over_time;
} else
{return null;
}
}
})();if(cljs.core.truth_(temp__4092__auto__))
{var exp = temp__4092__auto__;return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.watch.custom-watch-selection","editor.watch.custom-watch-selection",3503983620),[cljs.core.str(exp)].join(''));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.rough-time","rolex.watch.rough-time",4297672446),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Watch selection and show estimated execution time",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = (function (){var pred__8391 = cljs.core._EQ_;var expr__8392 = lt.plugins.rolex.core.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));if(cljs.core.truth_(pred__8391.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8392)))
{return lt.plugins.rolex.cljs.convenient_time;
} else
{if(cljs.core.truth_(pred__8391.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.clj_mime),expr__8392)))
{return lt.plugins.rolex.clj.convenient_time;
} else
{return null;
}
}
})();if(cljs.core.truth_(temp__4092__auto__))
{var exp = temp__4092__auto__;return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.watch.custom-watch-selection","editor.watch.custom-watch-selection",3503983620),[cljs.core.str(exp)].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"verbatim","verbatim",3307884968),true], null));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.to-console-as-js","rolex.watch.to-console-as-js",1446066265),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Watch selection and log to console as js object",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = (function (){var pred__8394 = cljs.core._EQ_;var expr__8395 = lt.plugins.rolex.core.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));if(cljs.core.truth_(pred__8394.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8395)))
{return lt.plugins.rolex.cljs.to_console_as_jsobj;
} else
{return null;
}
})();if(cljs.core.truth_(temp__4092__auto__))
{var exp = temp__4092__auto__;return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.watch.custom-watch-selection","editor.watch.custom-watch-selection",3503983620),[cljs.core.str(exp)].join(''));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.trace-count","rolex.watch.trace-count",573047598),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Count times selection is executed",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = (function (){var pred__8397 = cljs.core._EQ_;var expr__8398 = lt.plugins.rolex.core.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));if(cljs.core.truth_(pred__8397.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8398)))
{return lt.plugins.rolex.cljs.trace_count;
} else
{if(cljs.core.truth_(pred__8397.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.clj_mime),expr__8398)))
{return lt.plugins.rolex.clj.trace_count;
} else
{return null;
}
}
})();if(cljs.core.truth_(temp__4092__auto__))
{var exp = temp__4092__auto__;return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.watch.custom-watch-selection","editor.watch.custom-watch-selection",3503983620),[cljs.core.str(exp)].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"verbatim","verbatim",3307884968),true], null));
} else
{return null;
}
})], null));
lt.plugins.rolex.popup_val = (function popup_val(){return lt.util.dom.val.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",1114262332),lt.object.__GT_content.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"popup","popup",1120756766)))));
});
lt.plugins.rolex.focus_on_input = (function focus_on_input(obj){return lt.util.dom.focus.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",1114262332),lt.object.__GT_content.call(null,obj)));
});
lt.plugins.rolex.listen_for_enter = (function listen_for_enter(this$,obj,form){return lt.util.dom.on.call(null,lt.object.__GT_content.call(null,obj),new cljs.core.Keyword(null,"keyup","keyup",1115849900),(function (e){if(cljs.core._EQ_.call(null,13,e.which))
{return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"named-capture.end","named-capture.end",1269560593),form,lt.plugins.rolex.popup_val.call(null));
} else
{return null;
}
}));
});
lt.plugins.rolex.sub_capture_name = (function sub_capture_name(form,name){return clojure.string.replace.call(null,[cljs.core.str(form)].join(''),"__CAPTURENAME__",name);
});
lt.plugins.rolex.__BEH__named_capture__DOT__begin = (function __BEH__named_capture__DOT__begin(this$,form){var popup_content = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"Symbol",new cljs.core.Keyword(null,"body","body",1016933652),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1017479852),"text"], null)], null),new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"OK",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"named-capture.end","named-capture.end",1269560593),form,lt.plugins.rolex.popup_val.call(null));
})], null),lt.objs.popup.cancel_button], null)], null);var inst = lt.objs.popup.popup_BANG_.call(null,popup_content);lt.plugins.rolex.focus_on_input.call(null,inst);
return lt.plugins.rolex.listen_for_enter.call(null,this$,inst,form);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.rolex","named-capture.begin","lt.plugins.rolex/named-capture.begin",3028699552),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.rolex.__BEH__named_capture__DOT__begin,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"named-capture.begin","named-capture.begin",1883489247),null], null), null));
lt.plugins.rolex.__BEH__named_capture__DOT__end = (function __BEH__named_capture__DOT__end(this$,form,name){return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.watch.custom-watch-selection","editor.watch.custom-watch-selection",3503983620),lt.plugins.rolex.sub_capture_name.call(null,form,name));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.rolex","named-capture.end","lt.plugins.rolex/named-capture.end",3479016142),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.rolex.__BEH__named_capture__DOT__end,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"named-capture.end","named-capture.end",1269560593),null], null), null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.named-capture","rolex.watch.named-capture",3039048729),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Watch selection and store in local def with given name",new cljs.core.Keyword(null,"hidden","hidden",4091384092),true,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = (function (){var pred__8400 = cljs.core._EQ_;var expr__8401 = lt.plugins.rolex.core.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));if(cljs.core.truth_(pred__8400.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8401)))
{return lt.plugins.rolex.cljs.named_capture;
} else
{return null;
}
})();if(cljs.core.truth_(temp__4092__auto__))
{var exp = temp__4092__auto__;return lt.object.raise.call(null,lt.objs.editor.pool.last_active.call(null),new cljs.core.Keyword(null,"named-capture.begin","named-capture.begin",1883489247),exp);
} else
{return null;
}
})], null));
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.rolex","lens.summarize-lt-objs","lt.plugins.rolex/lens.summarize-lt-objs",4791226184),new cljs.core.Keyword(null,"reaction","reaction",4441361819),(function (this__7878__auto__,lenses__7879__auto__){var temp__4090__auto__ = (function (){var pred__8403 = cljs.core._EQ_;var expr__8404 = lt.plugins.rolex.core.current_mime.call(null);if(cljs.core.truth_(pred__8403.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8404)))
{return new cljs.core.Symbol("lt.plugins.rolex.lighttable","->summarize","lt.plugins.rolex.lighttable/->summarize",-309589529,null);
} else
{if(cljs.core.truth_(pred__8403.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.clj_mime),expr__8404)))
{return null;
} else
{throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__8404)].join('')));
}
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var var__7880__auto__ = temp__4090__auto__;return cljs.core.assoc.call(null,lenses__7879__auto__,new cljs.core.Keyword(null,"->ltsummarize","->ltsummarize",3799710170),cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.rolex.compiler.interns),var__7880__auto__));
} else
{return lenses__7879__auto__;
}
}),new cljs.core.Keyword(null,"desc","desc",1016984067),"Summarizes light table object maps and lets other values passthrough",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lens+","lens+",1116762719),null], null), null));
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.rolex","lens.values-over-time","lt.plugins.rolex/lens.values-over-time",4762784098),new cljs.core.Keyword(null,"reaction","reaction",4441361819),(function (this__7878__auto__,lenses__7879__auto__){var temp__4090__auto__ = (function (){var pred__8406 = cljs.core._EQ_;var expr__8407 = lt.plugins.rolex.core.current_mime.call(null);if(cljs.core.truth_(pred__8406.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8407)))
{return new cljs.core.Symbol("lt.plugins.rolex.cljs","->values-over-time","lt.plugins.rolex.cljs/->values-over-time",386405227,null);
} else
{if(cljs.core.truth_(pred__8406.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.clj_mime),expr__8407)))
{return new cljs.core.Symbol("lt.plugins.rolex.clj","->values-over-time","lt.plugins.rolex.clj/->values-over-time",272337076,null);
} else
{throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__8407)].join('')));
}
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var var__7880__auto__ = temp__4090__auto__;return cljs.core.assoc.call(null,lenses__7879__auto__,new cljs.core.Keyword(null,"->values-over-time","->values-over-time",1347063902),cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.rolex.compiler.interns),var__7880__auto__));
} else
{return lenses__7879__auto__;
}
}),new cljs.core.Keyword(null,"desc","desc",1016984067),"Captures the sequence of values as they pass through the watch",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lens+","lens+",1116762719),null], null), null));
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.rolex","lens.to-console-as-jsobj","lt.plugins.rolex/lens.to-console-as-jsobj",868408002),new cljs.core.Keyword(null,"reaction","reaction",4441361819),(function (this__7878__auto__,lenses__7879__auto__){var temp__4090__auto__ = (function (){var pred__8409 = cljs.core._EQ_;var expr__8410 = lt.plugins.rolex.core.current_mime.call(null);if(cljs.core.truth_(pred__8409.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8410)))
{return new cljs.core.Symbol("lt.plugins.rolex.cljs","->console-log","lt.plugins.rolex.cljs/->console-log",-1419812456,null);
} else
{if(cljs.core.truth_(pred__8409.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.clj_mime),expr__8410)))
{return null;
} else
{throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__8410)].join('')));
}
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var var__7880__auto__ = temp__4090__auto__;return cljs.core.assoc.call(null,lenses__7879__auto__,new cljs.core.Keyword(null,"->console-log","->console-log",2484707055),cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.rolex.compiler.interns),var__7880__auto__));
} else
{return lenses__7879__auto__;
}
}),new cljs.core.Keyword(null,"desc","desc",1016984067),"Pass values throught clj->js and log values to the console. Includes\n      a preceding line that prints the expression the value came from.",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lens+","lens+",1116762719),null], null), null));
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.rolex","watch-lenses","lt.plugins.rolex/watch-lenses",2761966625),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watch-lens","watch-lens",867605166),null], null), null),new cljs.core.Keyword(null,"init","init",1017141378),(function (this$){return null;
}));
lt.plugins.rolex.lenses = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.rolex","watch-lenses","lt.plugins.rolex/watch-lenses",2761966625));
lt.plugins.rolex.lens_watch = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"result","result",1720009174,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null)),new cljs.core.Symbol(null,"display","display",31232635,null),cljs.core.list(cljs.core.list(new cljs.core.Symbol(null,"comp","comp",-1637472056,null),new cljs.core.Symbol(null,"__LENSES__","__LENSES__",-309251931,null)),new cljs.core.Symbol(null,"result","result",1720009174,null))], null),new cljs.core.Symbol(null,"__|display|__","__|display|__",-469250897,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),"lt.plugins.rolex");
lt.plugins.rolex.substitue_lenses = (function substitue_lenses(fns){return clojure.string.replace.call(null,[cljs.core.str(lt.plugins.rolex.lens_watch)].join(''),"__LENSES__",cljs.core.apply.call(null,cljs.core.str,cljs.core.interpose.call(null," ",cljs.core.reverse.call(null,fns))));
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.with-lenses","rolex.watch.with-lenses",737888698),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Watch selection and pass result through lense functions",new cljs.core.Keyword(null,"hidden","hidden",4091384092),true,new cljs.core.Keyword(null,"exec","exec",1017031683),(function() { 
var G__8416__delegate = function (ks){if(cljs.core.empty_QMARK_.call(null,ks))
{return null;
} else
{var all = lt.object.raise_reduce.call(null,lt.plugins.rolex.lenses,new cljs.core.Keyword(null,"lens+","lens+",1116762719),cljs.core.PersistentArrayMap.EMPTY);var fns = cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,cljs.core.nil_QMARK_),(function (){var iter__7081__auto__ = ((function (all){
return (function iter__8412(s__8413){return (new cljs.core.LazySeq(null,((function (all){
return (function (){var s__8413__$1 = s__8413;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__8413__$1);if(temp__4092__auto__)
{var s__8413__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__8413__$2))
{var c__7079__auto__ = cljs.core.chunk_first.call(null,s__8413__$2);var size__7080__auto__ = cljs.core.count.call(null,c__7079__auto__);var b__8415 = cljs.core.chunk_buffer.call(null,size__7080__auto__);if((function (){var i__8414 = 0;while(true){
if((i__8414 < size__7080__auto__))
{var k = cljs.core._nth.call(null,c__7079__auto__,i__8414);cljs.core.chunk_append.call(null,b__8415,cljs.core.get.call(null,all,k));
{
var G__8417 = (i__8414 + 1);
i__8414 = G__8417;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8415),iter__8412.call(null,cljs.core.chunk_rest.call(null,s__8413__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8415),null);
}
} else
{var k = cljs.core.first.call(null,s__8413__$2);return cljs.core.cons.call(null,cljs.core.get.call(null,all,k),iter__8412.call(null,cljs.core.rest.call(null,s__8413__$2)));
}
} else
{return null;
}
break;
}
});})(all))
,null,null));
});})(all))
;return iter__7081__auto__.call(null,ks);
})());if(cljs.core.seq.call(null,fns))
{return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.watch.custom-watch-selection","editor.watch.custom-watch-selection",3503983620),lt.plugins.rolex.substitue_lenses.call(null,fns));
} else
{return null;
}
}
};
var G__8416 = function (var_args){
var ks = null;if (arguments.length > 0) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__8416__delegate.call(this,ks);};
G__8416.cljs$lang$maxFixedArity = 0;
G__8416.cljs$lang$applyTo = (function (arglist__8418){
var ks = cljs.core.seq(arglist__8418);
return G__8416__delegate(ks);
});
G__8416.cljs$core$IFn$_invoke$arity$variadic = G__8416__delegate;
return G__8416;
})()
], null));
}
if(!lt.util.load.provided_QMARK_('lt.plugins.rolex.examples')) {
goog.provide('lt.plugins.rolex.examples');
goog.require('cljs.core');
goog.require('lt.plugins.rolex.cljs');
goog.require('lt.plugins.rolex.cljs');
goog.require('lt.plugins.rolex.cljs');
goog.require('lt.plugins.rolex.compiler');
goog.require('lt.plugins.rolex.compiler');
goog.require('lt.plugins.rolex.core');
goog.require('lt.plugins.rolex.core');
}

//# sourceMappingURL=rolex_compiled.js.map