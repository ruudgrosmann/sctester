defineParameterType({
  name: "containsornot",
  regexp: /(contains|does not contain)/,
  transformer(s) {
	return /contains/.test (s);
  },
});

defineParameterType({
  name: "onoroff",
  regexp: /(on|off)/,
  transformer(s) {
	return /on/.test (s);
  },
});

defineParameterType({
  name: "optniet",
  regexp: /(?:(don't|not?) )?/,
  transformer(s) {
	if (!s) {
		return false;
	}
	return true;
  },
});

defineParameterType({
  name: "relationtype",
  regexp: /(VAC|product)/,
  transformer (s) { return s },
});

defineParameterType({
  name: "icontype",
  regexp: /(gepubliceerd|publicatiegereed|in bewerking|eigen product|klaar voor eindredactie)/,
  transformer (s) { return s },
});
