'use client';
// import {useState,useEffect} from 'react';
//WIP DO NOT TOUCH - CHRIS ONLY
export default function ReceivingTable() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-9 border border-red-500">
      <h1 className="mb-2 border border-amber-400">Receiving</h1>
      <p className="mb-6 text sm text-white ">
        {' '}
        Enter information to search part from the delivery
      </p>
      <label> Find part # or enter the description</label>
      <input
        id="part-search"
        type="text"
        placeholder="Ex: battery fluid or 123"
        className="ml-4 border border-zinc-500 p-2 rounded"
        autoComplete="off"
      ></input>
    </div>
  );
}
