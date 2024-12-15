import React from 'react'
import headerIcon from '../files/headerIcon.svg'
export default function HemoHeader() {
  return (
    <div className='header spacebetween padding'>
        <div className='imgCon center'>
            <img src={headerIcon} alt=''></img> 
        </div>
        <div className='header_content center'>
            <p>مرحبا بكم في منصة 'الكود' لتعليم السياقة حسب التحديث الأخير لبنك الأسئلة 2025</p>
            <div className='twobutns spacebetween'>
            <a href='/#contact'>  <button className='blank rad20'>تواصلوا معنا</button></a>
            <a href='/#content'>   <button className='full rad20'>ابدأ التعلم الآن</button></a>
            </div>
        </div>
    </div>
  )
}
