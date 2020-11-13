import React from 'react';

import reducer from './groups';
import * as actionTypes from '../actions/actionTypes';

const stubGroups = [
    { id: 1, name: 'test', description: null, time: 'P0DT10H42M00S' },
    { id: 2, name: 'test2', description: null, time: 'P0DT10H41M00S' }
]
const newGroup ={
    id: 3, name: 'test3', description: null, time: 'P0DT10H42M00S'
}
describe('group Reducer', () => {
    it('should return default state', () => {
        const newState = reducer(undefined, {}); // initialize
        expect(newState).toEqual({ 
            myGroupList: [],
            searchGroupList: [],
            specificGroupInfo: null,
            unenrolledGroupInfo: null
        });
    })
    it('should get all Groups', () => {
        const newState = reducer(undefined, {
          type: actionTypes.GET_GROUPS,
          groups: stubGroups,
        });
        expect(newState).toEqual({
            myGroupList: stubGroups,
            searchGroupList: [],
            specificGroupInfo: null,
            unenrolledGroupInfo: null
        });
    });
    it('should get Group', () => {
        const newState = reducer(undefined, {
          type: actionTypes.GET_GROUP,
          targetGroup: stubGroups[0],
        });
        expect(newState).toEqual({
            myGroupList: [],
            searchGroupList: [],
            specificGroupInfo: stubGroups[0],
            unenrolledGroupInfo: null
        });
    });
    it('should add newGroup', () => {
        const newState = reducer(undefined, {
            type: actionTypes.ADD_GROUP,
            id: newGroup.id,
            name: newGroup.name,
            description: newGroup.description,
            time: newGroup.time,
        });
        expect(newState).toEqual({
            myGroupList: [newGroup],
            searchGroupList: [],
            specificGroupInfo: null,
            unenrolledGroupInfo: null
        });
    });
    it('should search Group', () => {
        const newState = reducer(undefined, {
            type: actionTypes.SEARCH_GROUP,
            searchedGroups: stubGroups
        });
        expect(newState).toEqual({
            myGroupList: [],
            searchGroupList: stubGroups,
            specificGroupInfo: null,
            unenrolledGroupInfo: null
        });
    });
    it('should delete Groups', () => {
        const stubInitialState = {
            myGroupList: stubGroups,
          };
        const newState = reducer(stubInitialState, {
            type: actionTypes.DELETE_GROUP,
            targetID: 1
        });
        expect(newState).toEqual({
            myGroupList: [stubGroups[1]]
        });
    });
    it('should get unenrolled', () => {
        const newState = reducer(undefined, {
            type: actionTypes.GET_UNENROLLED,
            unenrolledGroupInfo: 1,
          });
        const unState = {
            "myGroupList": [],
            "searchGroupList": [],
            "specificGroupInfo": null,
            "unenrolledGroupInfo": undefined
        }
          expect(newState).toEqual(unState);
    })
    it('should join group', () => {
        const stubInitialState = {
            myGroupList: [],
            unenrolledGroupInfo: null
          };
        const join_group = {
            id: 1,
            name: "test",
            time: "P0DT10H42M00S",
            description: "hi",
            members: [1,2,3]
        }
        
        const newState = reducer(stubInitialState, {
            type: actionTypes.JOIN_GROUP,
            id: 1,
            name: "test",
            time: "P0DT10H42M00S",
            description: "hi",
            members: [1,2,3]
          });
          expect(newState).toEqual({
            myGroupList: [join_group],
            unenrolledGroupInfo: null
        });
    })
})