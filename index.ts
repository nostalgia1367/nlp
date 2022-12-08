const winkNLP = require('wink-nlp');
// Load english language model.
const model = require('wink-eng-lite-web-model');
import { pipe, range, map, filter, take, each, toArray, reduce, groupBy, concat, sort, toAsync, append } from '@fxts/core';
// import * as wink from 'wink-nlp';
import {wink-eng-lite-web-model} from 'wink-nlp';

const nlp = winkNLP(model);

//속성
const its = nlp.its;

//컬렉션을 줄이기 위해 "as"
const as = nlp.as;

// NLP Code.
const text = 'Hello   World🌎! How are you?';
const doc = nlp.readDoc(text);

console.log(doc.out());
// -> Hello   World🌎! How are you?

console.log(doc.sentences().out());
// -> [ 'Hello   World🌎!', 'How are you?' ]

console.log(doc.entities().out(its.detail));
// -> [ { value: '🌎', type: 'EMOJI' } ]

console.log(doc.tokens().out());
// -> [ 'Hello', 'World', '🌎', '!', 'How', 'are', 'you', '?' ]

console.log(doc.tokens().out(its.type, as.freqTable));
// -> [ [ 'word', 5 ], [ 'punctuation', 2 ], [ 'emoji', 1 ] ]

console.log(wink.default);
