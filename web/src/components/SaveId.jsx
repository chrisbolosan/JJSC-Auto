"use client";
import {useState} from 'react';
import { getFullCart, getItem, setItem } from '@/app/api/utils/localStorage'
import { useEffect } from 'react';
import ShowItems from './ShowItems';

export default function SaveId({val}){
    setItem("id", val);
}