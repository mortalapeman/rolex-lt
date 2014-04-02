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
clojure.walk.keywordize_keys = (function keywordize_keys(m){var f = (function (p__8422){var vec__8423 = p__8422;var k = cljs.core.nth.call(null,vec__8423,0,null);var v = cljs.core.nth.call(null,vec__8423,1,null);if(typeof k === 'string')
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,k),v], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null);
}
});return clojure.walk.postwalk.call(null,(function (x){if(cljs.core.map_QMARK_.call(null,x))
{return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,f,x));
} else
{return x;
}
}),m);
});
/**
* Recursively transforms all map keys from keywords to strings.
*/
clojure.walk.stringify_keys = (function stringify_keys(m){var f = (function (p__8426){var vec__8427 = p__8426;var k = cljs.core.nth.call(null,vec__8427,0,null);var v = cljs.core.nth.call(null,vec__8427,1,null);if((k instanceof cljs.core.Keyword))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name.call(null,k),v], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null);
}
});return clojure.walk.postwalk.call(null,(function (x){if(cljs.core.map_QMARK_.call(null,x))
{return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,f,x));
} else
{return x;
}
}),m);
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
lt.plugins.rolex.compiler.inline = (function inline(form,current_ns){var transform = (function transform(x){var temp__4090__auto__ = (function (){var or__6816__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.rolex.compiler.interns),x);if(cljs.core.truth_(or__6816__auto__))
{return or__6816__auto__;
} else
{if((function (){var G__8446 = x;if(G__8446)
{var bit__7459__auto__ = (G__8446.cljs$lang$protocol_mask$partition1$ & 4096);if((bit__7459__auto__) || (G__8446.cljs$core$INamed$))
{return true;
} else
{return false;
}
} else
{return false;
}
})())
{return cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.rolex.compiler.interns),cljs.core.symbol.call(null,current_ns,cljs.core.name.call(null,x)));
} else
{return null;
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
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.cljs","capture"),cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"capture8539","capture8539",-1478463454,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-1640531407,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",-1640528170,null),cljs.core.list(new cljs.core.Symbol(null,"atom?","atom?",-1547384121,null),new cljs.core.Symbol(null,"x","x",-1640531407,null)),cljs.core.list(new cljs.core.Symbol(null,"atom","atom",-1637526774,null),cljs.core.list(new cljs.core.Symbol("clojure.core","deref","clojure.core/deref",-564909588,null),new cljs.core.Symbol(null,"x","x",-1640531407,null))),new cljs.core.Symbol(null,"x","x",-1640531407,null))));
lt.plugins.rolex.cljs.capture = (function capture(x){if(cljs.core.truth_(lt.plugins.rolex.cljs.atom_QMARK_.call(null,x)))
{return cljs.core.atom.call(null,cljs.core.deref.call(null,x));
} else
{return x;
}
});
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.cljs","capture-values"),cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"capture-values8540","capture-values8540",-1157335813,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"id","id",-1640528172,null),new cljs.core.Symbol(null,"x","x",-1640531407,null)], null),cljs.core.list(new cljs.core.Symbol(null,"when-not","when-not",401151865,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),cljs.core.list(new cljs.core.Symbol(null,"def","def",-1640432194,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),cljs.core.list(new cljs.core.Symbol(null,"atom","atom",-1637526774,null),cljs.core.PersistentArrayMap.EMPTY))),cljs.core.list(new cljs.core.Symbol(null,"swap!","swap!",-1530684761,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),new cljs.core.Symbol(null,"update-in","update-in",705189474,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"id","id",-1640528172,null)], null),cljs.core.list(new cljs.core.Symbol(null,"fnil","fnil",-1637383772,null),new cljs.core.Symbol(null,"conj","conj",-1637472031,null),cljs.core.PersistentVector.EMPTY),new cljs.core.Symbol(null,"result","result",1720009174,null)),cljs.core.list(new cljs.core.Symbol(null,"get","get",-1640429297,null),cljs.core.list(new cljs.core.Symbol("clojure.core","deref","clojure.core/deref",-564909588,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null)),new cljs.core.Symbol(null,"id","id",-1640528172,null),"Watch not found")));
lt.plugins.rolex.cljs.capture_values = (function capture_values(id,x){if(cljs.core.truth_(lt.plugins.rolex.cljs.WATCHLOG))
{} else
{lt.plugins.rolex.cljs.WATCHLOG = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.cljs.WATCHLOG,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [id], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),lt.plugins.rolex.cljs.result);
return cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.rolex.cljs.WATCHLOG),id,"Watch not found");
});
lt.plugins.rolex.cljs.values_over_time = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"result","result",1720009174,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null))], null),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"capture-values","capture-values",-281403582,null),new cljs.core.Symbol(null,"__ID__","__ID__",1169215444,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),"lt.plugins.rolex.cljs");
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.cljs","console-log"),cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"console-log8541","console-log8541",-1302290751,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"exp","exp",-1640430634,null),new cljs.core.Symbol(null,"result","result",1720009174,null)], null),cljs.core.list(new cljs.core.Symbol(null,".log",".log",-1639053809,null),new cljs.core.Symbol("js","console","js/console",-688801301,null),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),"Watch: ",new cljs.core.Symbol(null,"exp","exp",-1640430634,null)," =>")),cljs.core.list(new cljs.core.Symbol(null,".log",".log",-1639053809,null),new cljs.core.Symbol("js","console","js/console",-688801301,null),cljs.core.list(new cljs.core.Symbol(null,"clj->js","clj->js",-780735212,null),new cljs.core.Symbol(null,"result","result",1720009174,null)))));
lt.plugins.rolex.cljs.console_log = (function console_log(exp,result){console.log([cljs.core.str("Watch: "),cljs.core.str(exp),cljs.core.str(" =>")].join(''));
console.log(cljs.core.clj__GT_js.call(null,result));
return result;
});
lt.plugins.rolex.cljs.to_console_as_jsobj = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"exp","exp",-1640430634,null),cljs.core.list(new cljs.core.Symbol(null,"pr-str","pr-str",1672669599,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null)),new cljs.core.Symbol(null,"result","result",1720009174,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null))], null),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"console-log","console-log",735310727,null),new cljs.core.Symbol(null,"exp","exp",-1640430634,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),"lt.plugins.rolex.cljs");
lt.plugins.rolex.cljs.convenient_time = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"start","start",-1530773989,null),cljs.core.list(new cljs.core.Symbol(null,".getTime",".getTime",1144210702,null),cljs.core.list(new cljs.core.Symbol("js","Date.","js/Date.",-1574508510,null))),new cljs.core.Symbol(null,"res","res",-1640418727,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null))], null),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),cljs.core.list(new cljs.core.Symbol(null,"-","-",-1640531482,null),cljs.core.list(new cljs.core.Symbol(null,".getTime",".getTime",1144210702,null),cljs.core.list(new cljs.core.Symbol("js","Date.","js/Date.",-1574508510,null))),new cljs.core.Symbol(null,"start","start",-1530773989,null))," ms"),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"res","res",-1640418727,null)),"lt.plugins.rolex.cljs");
lt.plugins.rolex.cljs.named_capture = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"res","res",-1640418727,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null))], null),cljs.core.list(new cljs.core.Symbol(null,"when-not","when-not",401151865,null),new cljs.core.Symbol(null,"__CAPTURENAME__","__CAPTURENAME__",597794858,null),cljs.core.list(new cljs.core.Symbol(null,"def","def",-1640432194,null),new cljs.core.Symbol(null,"__CAPTURENAME__","__CAPTURENAME__",597794858,null),cljs.core.list(new cljs.core.Symbol(null,"atom","atom",-1637526774,null),cljs.core.list(new cljs.core.Symbol(null,"capture","capture",-1087946497,null),new cljs.core.Symbol(null,"res","res",-1640418727,null))))),cljs.core.list(new cljs.core.Symbol(null,"reset!","reset!",1719993963,null),new cljs.core.Symbol(null,"__CAPTURENAME__","__CAPTURENAME__",597794858,null),new cljs.core.Symbol(null,"res","res",-1640418727,null)),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),"__CAPTURENAME__: ",cljs.core.list(new cljs.core.Symbol(null,"pr-str","pr-str",1672669599,null),new cljs.core.Symbol(null,"res","res",-1640418727,null))),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"res","res",-1640418727,null)),"lt.plugins.rolex.cljs");
}
if(!lt.util.load.provided_QMARK_('lt.plugins.rolex.core')) {
goog.provide('lt.plugins.rolex.core');
goog.require('cljs.core');
goog.require('lt.plugins.rolex.compiler');
goog.require('lt.objs.files');
goog.require('lt.objs.files');
lt.plugins.rolex.core.delayed_mime = (function delayed_mime(name){return (new cljs.core.Delay(cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"done","done",1016993524),false,new cljs.core.Keyword(null,"value","value",1125876963),null], null)),(function (){return new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.files.files_obj)),name));
})));
});
lt.plugins.rolex.core.ed__GT_mime = (function ed__GT_mime(editor){return new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)));
});
lt.plugins.rolex.core.cljs_mime = lt.plugins.rolex.core.delayed_mime.call(null,"ClojureScript");
lt.plugins.rolex.core.clj_mime = lt.plugins.rolex.core.delayed_mime.call(null,"Clojure");
}
if(!lt.util.load.provided_QMARK_('lt.plugins.rolex.lighttable')) {
goog.provide('lt.plugins.rolex.lighttable');
goog.require('cljs.core');
goog.require('lt.plugins.rolex.core');
goog.require('lt.objs.files');
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
var result__8197__auto___8559 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"behaviors","behaviors",607554515),null,new cljs.core.Keyword("lt.object","type","lt.object/type",701613666),null,new cljs.core.Keyword(null,"listeners","listeners",4090152369),null,new cljs.core.Keyword(null,"triggers","triggers",2516997421),null,new cljs.core.Keyword(null,"tags","tags",1017456523),null], null), null);cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.lighttable","obj-keys"),result__8197__auto___8559);
lt.plugins.rolex.lighttable.obj_keys = result__8197__auto___8559;
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.lighttable","atom?"),cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"atom?8552","atom?8552",-1953245663,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-1640531407,null)], null),cljs.core.list(new cljs.core.Symbol(null,"when","when",-1636883213,null),new cljs.core.Symbol(null,"x","x",-1640531407,null),cljs.core.list(new cljs.core.Symbol(null,"instance?","instance?",-1611433981,null),new cljs.core.Symbol(null,"Atom","Atom",-1638480086,null),new cljs.core.Symbol(null,"x","x",-1640531407,null)))));
lt.plugins.rolex.lighttable.atom_QMARK_ = (function atom_QMARK_(x){if(cljs.core.truth_(x))
{return (x instanceof cljs.core.Atom);
} else
{return null;
}
});
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.lighttable","->deref"),cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"->deref8553","->deref8553",459134197,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-1640531407,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",-1640528170,null),cljs.core.list(new cljs.core.Symbol(null,"atom?","atom?",-1547384121,null),new cljs.core.Symbol(null,"x","x",-1640531407,null)),cljs.core.list(new cljs.core.Symbol(null,"deref","deref",-1545057749,null),new cljs.core.Symbol(null,"x","x",-1640531407,null)),new cljs.core.Symbol(null,"x","x",-1640531407,null))));
lt.plugins.rolex.lighttable.__GT_deref = (function __GT_deref(x){if(cljs.core.truth_(lt.plugins.rolex.lighttable.atom_QMARK_.call(null,x)))
{return cljs.core.deref.call(null,x);
} else
{return x;
}
});
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.lighttable","ltobj?"),cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"ltobj?8554","ltobj?8554",-546414651,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-1640531407,null)], null),cljs.core.list(new cljs.core.Symbol(null,"when-let","when-let",401149633,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"derefed","derefed",-84540854,null),cljs.core.list(new cljs.core.Symbol(null,"->deref","->deref",1512909594,null),new cljs.core.Symbol(null,"x","x",-1640531407,null))], null),cljs.core.list(new cljs.core.Symbol(null,"boolean","boolean",-1575819807,null),cljs.core.list(new cljs.core.Symbol(null,"and","and",-1640434800,null),cljs.core.list(new cljs.core.Symbol(null,"map?","map?",-1637187556,null),new cljs.core.Symbol(null,"derefed","derefed",-84540854,null)),cljs.core.list(new cljs.core.Keyword("lt.object","id","lt.object/id",706431105),new cljs.core.Symbol(null,"derefed","derefed",-84540854,null)))))));
lt.plugins.rolex.lighttable.ltobj_QMARK_ = (function ltobj_QMARK_(x){var temp__4092__auto__ = lt.plugins.rolex.lighttable.__GT_deref.call(null,x);if(cljs.core.truth_(temp__4092__auto__))
{var derefed = temp__4092__auto__;return cljs.core.boolean$.call(null,(function (){var and__6804__auto__ = cljs.core.map_QMARK_.call(null,derefed);if(and__6804__auto__)
{return new cljs.core.Keyword("lt.object","id","lt.object/id",706431105).cljs$core$IFn$_invoke$arity$1(derefed);
} else
{return and__6804__auto__;
}
})());
} else
{return null;
}
});
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.lighttable","summarize"),cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"summarize8555","summarize8555",-1469817641,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"obj","obj",-1640421712,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",-1640528170,null),cljs.core.list(new cljs.core.Symbol(null,"ltobj?","ltobj?",1561949545,null),new cljs.core.Symbol(null,"obj","obj",-1640421712,null)),cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"bins","bins",-1637507579,null),cljs.core.list(new cljs.core.Symbol(null,"group-by","group-by",-1134218210,null),cljs.core.list(new cljs.core.Symbol(null,"comp","comp",-1637472056,null),new cljs.core.Symbol(null,"boolean","boolean",-1575819807,null),new cljs.core.Symbol(null,"obj-keys","obj-keys",-1601528125,null),new cljs.core.Symbol(null,"first","first",-1543091095,null)),cljs.core.list(new cljs.core.Symbol(null,"->deref","->deref",1512909594,null),new cljs.core.Symbol(null,"obj","obj",-1640421712,null))),new cljs.core.Symbol(null,"wrap","wrap",-1636873725,null),cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"v","v",-1640531409,null)], null),cljs.core.list(new cljs.core.Symbol(null,"if","if",-1640528170,null),cljs.core.list(new cljs.core.Symbol(null,"atom?","atom?",-1547384121,null),new cljs.core.Symbol(null,"obj","obj",-1640421712,null)),cljs.core.list(new cljs.core.Symbol(null,"atom","atom",-1637526774,null),new cljs.core.Symbol(null,"v","v",-1640531409,null)),new cljs.core.Symbol(null,"v","v",-1640531409,null)))], null),cljs.core.list(new cljs.core.Symbol(null,"->","->",-1640530070,null),cljs.core.list(new cljs.core.Symbol(null,"into","into",-1637294055,null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.list(new cljs.core.Symbol(null,"get","get",-1640429297,null),new cljs.core.Symbol(null,"bins","bins",-1637507579,null),true)),cljs.core.list(new cljs.core.Symbol(null,"assoc-in","assoc-in",-2005053546,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"other-keys","other-keys",785231363)], null),cljs.core.list(new cljs.core.Symbol(null,"mapv","mapv",-1637187501,null),new cljs.core.Symbol(null,"first","first",-1543091095,null),cljs.core.list(new cljs.core.Symbol(null,"get","get",-1640429297,null),new cljs.core.Symbol(null,"bins","bins",-1637507579,null),false))),cljs.core.list(new cljs.core.Symbol(null,"wrap","wrap",-1636873725,null)))),new cljs.core.Symbol(null,"obj","obj",-1640421712,null))));
lt.plugins.rolex.lighttable.summarize = (function summarize(obj){if(cljs.core.truth_(lt.plugins.rolex.lighttable.ltobj_QMARK_.call(null,obj)))
{var bins = cljs.core.group_by.call(null,cljs.core.comp.call(null,cljs.core.boolean$,lt.plugins.rolex.lighttable.obj_keys,cljs.core.first),lt.plugins.rolex.lighttable.__GT_deref.call(null,obj));var wrap = ((function (bins){
return (function (v){if(cljs.core.truth_(lt.plugins.rolex.lighttable.atom_QMARK_.call(null,obj)))
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
lt.plugins.rolex.lighttable.lt_obj_summary = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"result","result",1720009174,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null)),new cljs.core.Symbol(null,"display","display",31232635,null),cljs.core.list(new cljs.core.Symbol(null,"if","if",-1640528170,null),cljs.core.list(new cljs.core.Symbol(null,"sequential?","sequential?",1865038041,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),cljs.core.list(new cljs.core.Symbol(null,"mapv","mapv",-1637187501,null),new cljs.core.Symbol(null,"summarize","summarize",-126704902,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),cljs.core.list(new cljs.core.Symbol(null,"summarize","summarize",-126704902,null),new cljs.core.Symbol(null,"result","result",1720009174,null)))], null),new cljs.core.Symbol(null,"__|display|__","__|display|__",-469250897,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),"lt.plugins.rolex.lighttable");
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.lt-objs-summary","rolex.watch.lt-objs-summary",4009330561),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Watch selection and summarize LT objects",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = (function (){var pred__8556 = cljs.core._EQ_;var expr__8557 = lt.plugins.rolex.core.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));if(cljs.core.truth_(pred__8556.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8557)))
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
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.compiler.interns,cljs.core.assoc,cljs.core.symbol.call(null,"lt.plugins.rolex.clj","log-values"),cljs.core.list(new cljs.core.Symbol(null,"fn","fn",-1640528255,null),new cljs.core.Symbol(null,"log-values8433","log-values8433",302893664,null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"id","id",-1640528172,null),new cljs.core.Symbol(null,"v","v",-1640531409,null)], null),cljs.core.list(new cljs.core.Symbol(null,"defonce","defonce",-95317569,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),cljs.core.list(new cljs.core.Symbol(null,"atom","atom",-1637526774,null),cljs.core.PersistentArrayMap.EMPTY)),cljs.core.list(new cljs.core.Symbol(null,"swap!","swap!",-1530684761,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),new cljs.core.Symbol(null,"update-in","update-in",705189474,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"id","id",-1640528172,null)], null),cljs.core.list(new cljs.core.Symbol(null,"fnil","fnil",-1637383772,null),new cljs.core.Symbol(null,"conj","conj",-1637472031,null),cljs.core.PersistentVector.EMPTY),new cljs.core.Symbol(null,"v","v",-1640531409,null)),cljs.core.list(new cljs.core.Symbol(null,"get","get",-1640429297,null),cljs.core.list(new cljs.core.Symbol("clojure.core","deref","clojure.core/deref",-564909588,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null)),new cljs.core.Symbol(null,"id","id",-1640528172,null),"Watch not found")));
lt.plugins.rolex.clj.log_values = (function log_values(id,v){if(typeof lt.plugins.rolex.clj.WATCHLOG !== 'undefined')
{} else
{lt.plugins.rolex.clj.WATCHLOG = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
cljs.core.swap_BANG_.call(null,lt.plugins.rolex.clj.WATCHLOG,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [id], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),v);
return cljs.core.get.call(null,cljs.core.deref.call(null,lt.plugins.rolex.clj.WATCHLOG),id,"Watch not found");
});
lt.plugins.rolex.clj.values_over_time = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"result","result",1720009174,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null)),new cljs.core.Symbol(null,"id","id",-1640528172,null),new cljs.core.Symbol(null,"__ID__","__ID__",1169215444,null)], null),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"log-values","log-values",-573150844,null),new cljs.core.Symbol(null,"id","id",-1640528172,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"result","result",1720009174,null)),"lt.plugins.rolex.clj");
lt.plugins.rolex.clj.convenient_time = lt.plugins.rolex.compiler.inline.call(null,cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"start","start",-1530773989,null),cljs.core.list(new cljs.core.Symbol("System","currentTimeMillis","System/currentTimeMillis",-1796581225,null)),new cljs.core.Symbol(null,"res","res",-1640418727,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null))], null),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),cljs.core.list(new cljs.core.Symbol(null,"-","-",-1640531482,null),cljs.core.list(new cljs.core.Symbol("System","currentTimeMillis","System/currentTimeMillis",-1796581225,null)),new cljs.core.Symbol(null,"start","start",-1530773989,null))," ms"),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"res","res",-1640418727,null)),"lt.plugins.rolex.clj");
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
goog.require('lt.plugins.rolex.clj');
goog.require('lt.objs.popup');
goog.require('lt.objs.popup');
goog.require('lt.objs.context');
goog.require('lt.util.dom');
goog.require('lt.objs.editor.pool');
goog.require('clojure.string');
goog.require('lt.objs.command');
goog.require('clojure.string');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.plugins.rolex.cljs');
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.values-over-time","rolex.watch.values-over-time",3678471320),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Watch selection values over time",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = (function (){var pred__8359 = cljs.core._EQ_;var expr__8360 = lt.plugins.rolex.core.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));if(cljs.core.truth_(pred__8359.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8360)))
{return lt.plugins.rolex.cljs.values_over_time;
} else
{if(cljs.core.truth_(pred__8359.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.clj_mime),expr__8360)))
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
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.rough-time","rolex.watch.rough-time",4297672446),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Watch selection and show estimated execution time",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = (function (){var pred__8362 = cljs.core._EQ_;var expr__8363 = lt.plugins.rolex.core.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));if(cljs.core.truth_(pred__8362.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8363)))
{return lt.plugins.rolex.cljs.convenient_time;
} else
{if(cljs.core.truth_(pred__8362.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.clj_mime),expr__8363)))
{return lt.plugins.rolex.clj.convenient_time;
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
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.to-console-as-js","rolex.watch.to-console-as-js",1446066265),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Watch selection and log to console as js object",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = (function (){var pred__8365 = cljs.core._EQ_;var expr__8366 = lt.plugins.rolex.core.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));if(cljs.core.truth_(pred__8365.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8366)))
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
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.named-capture","rolex.watch.named-capture",3039048729),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Watch selection and store in local def with given name",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = (function (){var pred__8368 = cljs.core._EQ_;var expr__8369 = lt.plugins.rolex.core.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));if(cljs.core.truth_(pred__8368.call(null,cljs.core.deref.call(null,lt.plugins.rolex.core.cljs_mime),expr__8369)))
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
lt.plugins.rolex.popup_val = (function popup_val(){return lt.util.dom.val.call(null,lt.util.dom.$.call(null,new cljs.core.Keyword(null,"input","input",1114262332),lt.object.__GT_content.call(null,lt.objs.context.__GT_obj.call(null,new cljs.core.Keyword(null,"popup","popup",1120756766)))));
});
lt.plugins.rolex.sub_capture_name = (function sub_capture_name(form,name){return clojure.string.replace.call(null,[cljs.core.str(form)].join(''),"__CAPTURENAME__",name);
});
lt.plugins.rolex.__BEH__named_capture__DOT__begin = (function __BEH__named_capture__DOT__begin(this$,form){return lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"Symbol",new cljs.core.Keyword(null,"body","body",1016933652),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1017479852),"text"], null)], null),new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"OK",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"named-capture.end","named-capture.end",1269560593),form,lt.plugins.rolex.popup_val.call(null));
})], null),lt.objs.popup.cancel_button], null)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.rolex","named-capture.begin","lt.plugins.rolex/named-capture.begin",3028699552),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.rolex.__BEH__named_capture__DOT__begin,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"named-capture.begin","named-capture.begin",1883489247),null], null), null));
lt.plugins.rolex.__BEH__named_capture__DOT__end = (function __BEH__named_capture__DOT__end(this$,form,name){return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.watch.custom-watch-selection","editor.watch.custom-watch-selection",3503983620),lt.plugins.rolex.sub_capture_name.call(null,form,name));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.rolex","named-capture.end","lt.plugins.rolex/named-capture.end",3479016142),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.rolex.__BEH__named_capture__DOT__end,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"named-capture.end","named-capture.end",1269560593),null], null), null));
}

//# sourceMappingURL=rolex_compiled.js.map