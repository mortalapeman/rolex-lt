if(!lt.util.load.provided_QMARK_('lt.plugins.rolex')) {
goog.provide('lt.plugins.rolex');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.command');
goog.require('lt.objs.files');
goog.require('lt.objs.files');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.object');
goog.require('lt.object');
lt.plugins.rolex.delayed_mime = (function delayed_mime(name){return (new cljs.core.Delay(cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"done","done",1016993524),false,new cljs.core.Keyword(null,"value","value",1125876963),null], null)),(function (){return new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.files.files_obj)),name));
})));
});
lt.plugins.rolex.cljs_mime = lt.plugins.rolex.delayed_mime.call(null,"ClojureScript");
lt.plugins.rolex.clj_mime = lt.plugins.rolex.delayed_mime.call(null,"Clojure");
lt.plugins.rolex.ed__GT_mime = (function ed__GT_mime(editor){return new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)));
});
lt.plugins.rolex.cljs_values_over_time = cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"result","result",1720009174,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null)),new cljs.core.Symbol(null,"id","id",-1640528172,null),new cljs.core.Symbol(null,"__ID__","__ID__",1169215444,null)], null),cljs.core.list(new cljs.core.Symbol(null,"when-not","when-not",401151865,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),cljs.core.list(new cljs.core.Symbol(null,"def","def",-1640432194,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),cljs.core.list(new cljs.core.Symbol(null,"atom","atom",-1637526774,null),cljs.core.PersistentArrayMap.EMPTY))),cljs.core.list(new cljs.core.Symbol(null,"swap!","swap!",-1530684761,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),new cljs.core.Symbol(null,"update-in","update-in",705189474,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"id","id",-1640528172,null)], null),cljs.core.list(new cljs.core.Symbol(null,"fnil","fnil",-1637383772,null),new cljs.core.Symbol(null,"conj","conj",-1637472031,null),cljs.core.PersistentVector.EMPTY),new cljs.core.Symbol(null,"result","result",1720009174,null)),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"get","get",-1640429297,null),cljs.core.list(new cljs.core.Symbol("clojure.core","deref","clojure.core/deref",-564909588,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null)),new cljs.core.Symbol(null,"id","id",-1640528172,null),"Watch not found"),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"result","result",1720009174,null));
lt.plugins.rolex.clj_values_over_time = cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"result","result",1720009174,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null)),new cljs.core.Symbol(null,"id","id",-1640528172,null),new cljs.core.Symbol(null,"__ID__","__ID__",1169215444,null)], null),cljs.core.list(new cljs.core.Symbol(null,"defonce","defonce",-95317569,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),cljs.core.list(new cljs.core.Symbol(null,"atom","atom",-1637526774,null),cljs.core.PersistentArrayMap.EMPTY)),cljs.core.list(new cljs.core.Symbol(null,"swap!","swap!",-1530684761,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null),new cljs.core.Symbol(null,"update-in","update-in",705189474,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"id","id",-1640528172,null)], null),cljs.core.list(new cljs.core.Symbol(null,"fnil","fnil",-1637383772,null),new cljs.core.Symbol(null,"conj","conj",-1637472031,null),cljs.core.PersistentVector.EMPTY),new cljs.core.Symbol(null,"result","result",1720009174,null)),new cljs.core.Symbol(null,"__|","__|",-1640437163,null),cljs.core.list(new cljs.core.Symbol(null,"get","get",-1640429297,null),cljs.core.list(new cljs.core.Symbol("clojure.core","deref","clojure.core/deref",-564909588,null),new cljs.core.Symbol(null,"WATCHLOG","WATCHLOG",-312745522,null)),new cljs.core.Symbol(null,"id","id",-1640528172,null),"Watch not found"),new cljs.core.Symbol(null,"|__","|__",-1640409323,null),new cljs.core.Symbol(null,"result","result",1720009174,null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.values-over-time","rolex.watch.values-over-time",3678471320),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Watch selection values over time",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = (function (){var pred__8232 = cljs.core._EQ_;var expr__8233 = lt.plugins.rolex.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));if(cljs.core.truth_(pred__8232.call(null,cljs.core.deref.call(null,lt.plugins.rolex.cljs_mime),expr__8233)))
{return lt.plugins.rolex.cljs_values_over_time;
} else
{if(cljs.core.truth_(pred__8232.call(null,cljs.core.deref.call(null,lt.plugins.rolex.clj_mime),expr__8233)))
{return lt.plugins.rolex.clj_values_over_time;
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
lt.plugins.rolex.cljs_to_console_as_jsobj = cljs.core.list(new cljs.core.Symbol(null,"let","let",-1640424492,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"exp","exp",-1640430634,null),cljs.core.list(new cljs.core.Symbol(null,"pr-str","pr-str",1672669599,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null)),new cljs.core.Symbol(null,"result","result",1720009174,null),cljs.core.list(new cljs.core.Symbol(null,"do","do",-1640528316,null),new cljs.core.Symbol(null,"__SELECTION__","__SELECTION__",-1988549595,null))], null),cljs.core.list(new cljs.core.Symbol(null,".log",".log",-1639053809,null),new cljs.core.Symbol("js","console","js/console",-688801301,null),cljs.core.list(new cljs.core.Symbol(null,"str","str",-1640417302,null),"Watch: ",new cljs.core.Symbol(null,"exp","exp",-1640430634,null)," =>")),cljs.core.list(new cljs.core.Symbol(null,".log",".log",-1639053809,null),new cljs.core.Symbol("js","console","js/console",-688801301,null),cljs.core.list(new cljs.core.Symbol(null,"clj->js","clj->js",-780735212,null),new cljs.core.Symbol(null,"result","result",1720009174,null))),new cljs.core.Symbol(null,"__|result|__","__|result|__",-1591657284,null),new cljs.core.Symbol(null,"result","result",1720009174,null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"rolex.watch.to-console-as-js","rolex.watch.to-console-as-js",1446066265),new cljs.core.Keyword(null,"desc","desc",1016984067),"Rolex: Watch selection and log to console as js object",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = (function (){var pred__8235 = cljs.core._EQ_;var expr__8236 = lt.plugins.rolex.ed__GT_mime.call(null,lt.objs.editor.pool.last_active.call(null));if(cljs.core.truth_(pred__8235.call(null,cljs.core.deref.call(null,lt.plugins.rolex.cljs_mime),expr__8236)))
{return lt.plugins.rolex.cljs_to_console_as_jsobj;
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

//# sourceMappingURL=rolex_compiled.js.map