import mongoose from "mongoose";
const dictionarySchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    language: {
        type: String,
        default: 'en',
        index: true
    },
    definitions: [{
        partOfSpeech: {
            type: String,
            enum: ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection']
        },
        meaning: {
            type: String,
            required: true
        },
        example: String,
        synonyms: [String],
        antonyms: [String]
    }],
    pronunciation: {
        ipa: String,
        audioUrl: String
    },
    imageUrl: String,
    frequency: {
        type: String,
        enum: ['common', 'uncommon', 'rare'],
        default: 'common'
    },
    searchCount: {
        type: Number,
        default: 0
    },
    lastSearched: {
        type: Date
    }
}, {
    timestamps: true
});

// Text search index
dictionarySchema.index({ word: 'text' });
dictionarySchema.index({ searchCount: -1 });

const Dictionary = mongoose.model('Dictionary', dictionarySchema);
export default Dictionary;