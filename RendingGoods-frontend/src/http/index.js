import axios from "axios";

export const $isNotAuth = axios.create({
    baseURL: "http://localhost:8080"
})
export const $isAuth = axios.create({
    baseURL: "http://localhost:8080"
})

export function authenticateUser(user, password)
{
    let token = user + ":" + password;

    // Should i be encoding this value????? does it matter???
    // Base64 Encoding -> btoa
    let hash = btoa(token);

    return "Basic " + hash;
}

export const sendData = async(url,data)=>{
    const response = await fetch(url,{
        headers: { "Content-Type": "application/json" },
        method:'post',
        body: JSON.stringify(data)
    })
    if(!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибки${response}`)
    }
    return await response.json()
}
export const sendDataAuth = async(url,data,basic)=>{
    const response = await fetch(url,{
        headers: { "Content-Type": "application/json",
            'Authorization': `Basic ${basic}`},
        method:'post',
        body: JSON.stringify(data)
    })
    if(!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибки${response}`)
    }
    return await response.json()
}
export const sendDeleteDataAuth = async(url,data,basic)=>{
    const response = await fetch(url,{
        headers: { "Content-Type": "application/json",
            'Authorization': `Basic ${basic}`},
        method:'delete',
        body: JSON.stringify(data)
    })
    if(!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибки${response}`)
    }
    return await response.json()
}
export const getResource = async (url)=>{
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибки${response}`)
    }
    return await response.json();
}
export const getResourceAuth = async (url,basic)=>{
    const response = await fetch(url,
        {
        headers:{'Authorization': `Basic ${basic}`}
    }
    );
    if(!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибки${response}`)
    }
    return await response.json();
}
export function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
export function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}
export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}