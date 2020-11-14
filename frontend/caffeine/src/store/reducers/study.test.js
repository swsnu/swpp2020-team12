import React from 'react';
import reducer from './study';
import * as actionTypes from '../actions/actionTypes';

describe('studyReducer', () => {
    it('should infer study', () => {
        const stubInitialState = {
            status: null,
            gauge: null,
            subject: null
          };
        const newState = reducer(stubInitialState, {
            type: actionTypes.INFER_STUDY,
            inferred: {
                status: 1,
                gauge: 1,
                subject: null
            }
        });
        expect(newState).toEqual({
            status: 1,
            gauge: 1,
            subject: null
        });
    })
    it('should start study', () => {
        const stubInitialState = {
            status: null,
            gauge: null,
            subject: null
          };
        const newState = reducer(stubInitialState, {
            type: actionTypes.START_STUDY,
            subject: "swpp"
        });
        expect(newState).toEqual({
            status: null,
            gauge: null,
            subject: "swpp"
        });
    })
    it('should end study', () => {
        const stubInitialState = {
            status: 1,
            gauge: 1,
            subject: "swpp"
          };
        const newState = reducer(stubInitialState, {
            type: actionTypes.END_STUDY,
        });
        expect(newState).toEqual({
            status: null,
            gauge: null,
            subject: "swpp"
        });
    })
    it('should change subject', () => {
        const stubInitialState = {
            status: 1,
            gauge: 1,
            subject: "swpp"
          };
        const newState = reducer(stubInitialState, {
            type: actionTypes.CHANGE_SUBJECT,
            subject: "swpp"
        });
        expect(newState).toEqual({
            status: null, 
            gauge: null, 
            subject: "swpp"
        });
    })
})