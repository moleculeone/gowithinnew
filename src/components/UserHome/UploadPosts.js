import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config/firestore'


const UploadPosts = ({ posts, setPosts, setIsAdding, getPosts }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [details, setDetails] = useState('');
    const [code, setCode] = useState('');
    const [instructor, setInstructor] = useState('');
    const [duration, setDuration] = useState('');
    const [icon, setIcon] = useState('');
    const [type, setType] = useState('');
    const [sticky, setSticky] = useState('');
    const [category, setCategory] = useState('');
    const [quote, setQuote] = useState('');
    const [contentType, setContentType] = useState('');
    const [courseCode, setcourseCode] = useState('');

    const handleAdd = async (e) => {
        // e.preventDefault();
        const newPost1 = {
            title,
            description,
            details,
            code,
            instructor,
            duration,
            icon,
            type,
            sticky,
            category,
            quote,
            contentType,
            courseCode
        };


        const newPostAll = [
            {
                id: 1,
                title: "Morning meditation",
                description: "Guided morning meditation",
                code: "ROSUkJCSWos",
                instructor: "Mark",
                duration: "30",
                icon: "lotus.png",
                type: 'generic',
                sticky: 0,
                category: "Guided Meditation",
                contentType: "video"
            },
            {
                id: 2,
                title: "Morning meditation",
                description: "Guided morning meditation",
                code: "YNKxA7UwJSM",
                instructor: "Linda",
                duration: "32",
                icon: "lotus.png",
                type: 'generic',
                sticky: 0,
                category: "Guided Meditation",
                contentType: "video"
            },
            {
                id: 3,
                title: "Keeping Calm",
                description: "Guided meditation",
                code: "NVwQO0TQ--s",
                instructor: "Linda",
                duration: "32",
                icon: "lotus.png",
                type: 'generic',
                category: "Guided Meditation",
                contentType: "video"
            },
            {
                id: 4,
                title: "Feeling the joy",
                description: "Guided meditation",
                code: "yxWrlDk-85I",
                instructor: "Mark",
                duration: "36",
                icon: "lotus.png",
                type: 'generic',
                category: "Guided Meditation",
                contentType: "video"
            },
            {
                id: 5,
                title: "From the Heart",
                description: "Meditating from the Heart",
                code: "3j6fsYn6UQ4",
                instructor: "Linda",
                duration: "26",
                icon: "lotus.png",
                type: 'generic',
                category: "Guided Meditation",
                contentType: "video"
            },
            {
                id: 6,
                title: "Joy of the Spirit",
                description: "Feeling the Joy of the Spirit",
                code: "UXN7kJJo7UY",
                instructor: "Linda",
                duration: "32",
                icon: "lotus.png",
                type: 'generic',
                category: "Guided Meditation",
                contentType: "video"
            },
            {
                id: 7,
                title: "Basic Introduction",
                description: "Intro to thoughtless meditation",
                code: "298939847",
                instructor: "Linda",
                duration: "5",
                icon: "lotus.png",
                type: 'generic',
                sticky: 1,
                category: "Guided Meditation",
                contentType: "audio"
            },
            {
                id: 8,
                title: "Starting meditation",
                description: "General tips on getting started",
                code: "YNKxA7UwJSM",
                instructor: "Linda",
                duration: "7",
                icon: "lotus.png",
                type: 'generic',
                sticky: 1,
                category: "Guided Meditation",
                contentType: "video"
            },
            {
                id: 9,
                title: "Sab ko dua dena",
                description: "Sab ko dua dena",
                code: "BBGTXJKXJZM",
                instructor: "none",
                duration: "5",
                icon: "lotus.png",
                type: 'generic',
                sticky: 0,
                category: "Instrumental",
                contentType: "video"
            },
            {
                id: 10,
                title: "jago kundalini Maa",
                description: "jago kundalini Maa",
                code: "dKRb8b_w0Nk",
                instructor: "none",
                duration: "7",
                icon: "lotus.png",
                type: 'generic',
                sticky: 0,
                category: "Song",
                contentType: "video"
            },
            {
                id: 11,
                title: "SoundCloud",
                description: "soundcloud",
                code: "298939847",
                instructor: "none",
                duration: "7",
                icon: "lotus.png",
                type: 'generic',
                sticky: 0,
                category: "Song",
                contentType: "audio"
            },
            {
                id: 12,
                title: "Feeling depressed",
                description: "Get rid of your depression",
                code: "dKRb8b_w0Nk",
                instructor: "Hitesh",
                duration: "7",
                icon: "lotus.png",
                type: 'generic',
                sticky: 0,
                category: "State of mind",
                contentType: "video"
            },
            {
                id: 13,
                title: "Day 1",
                description: "Meditation session Day 1",
                details: "Meditation instruction details here, a lot of information about the meditation session",
                code: "dKRb8b_w0Nk",
                instructor: "Hitesh",
                duration: "7",
                icon: "lotus.png",
                type: 'generic',
                sticky: 0,
                category: "Meditation Course",
                contentType: "video"
            },
            {
                id: 14,
                title: "Day 2",
                description: "Meditation session Day 2",
                details: "Meditation instruction details here, a lot of information about the meditation session",
                code: "dKRb8b_w0Nk",
                instructor: "Hitesh",
                duration: "7",
                icon: "lotus.png",
                type: 'generic',
                sticky: 0,
                category: "Meditation Course",
                contentType: "video"
            },
            {
                id: 15,
                title: "Day 3",
                description: "Meditation session Day 1",
                code: "dKRb8b_w0Nk",
                instructor: "Hitesh",
                duration: "7",
                icon: "lotus.png",
                type: 'generic',
                sticky: 0,
                category: "Meditation Course",
                contentType: "video"
            },
            {
                id: 16,
                title: "Day 4",
                description: "Meditation session Day 2",
                code: "dKRb8b_w0Nk",
                instructor: "Hitesh",
                duration: "7",
                icon: "lotus.png",
                type: 'generic',
                sticky: 0,
                category: "Meditation Course",
                contentType: "video"
            },
            {
                id: 17,
                title: "Quote of the Day",
                description: "You cannot know the meaning of your Life until you are connected to the power that created you. Shri Mataji Nirmala Devi",
                code: "dKRb8b_w0Nk",
                instructor: "Hitesh",
                duration: "0",
                icon: "lotus.png",
                type: 'generic',
                sticky: 0,
                category: "Quote",
                quote: 1,
                contentType: "video"
            },
            {
                id: 18,
                title: "Science of meditation",
                description: "The state of thoughtless awareness.",
                code: "dKRb8b_w0Nk",
                instructor: "Hitesh",
                duration: "0",
                icon: "lotus.png",
                type: 'generic',
                sticky: 0,
                category: "Science of meditation",
                quote: 0,
                contentType: "video"
            }
            ,
            {
                id: 19,
                title: "History of meditation",
                description: "The state of silence",
                code: "dKRb8b_w0Nk",
                instructor: "Hitesh",
                duration: "0",
                icon: "lotus.png",
                type: 'generic',
                sticky: 0,
                category: "History of meditation",
                quote: 0,
                contentType: "video"
            }
        ]

        const newPost = {

            title: "First meditation",
            description: "Guided morning meditation",
            code: "ROSUkJCSWos",
            instructor: "Mark",
            duration: "30",
            icon: "lotus.png",
            type: 'generic',
            sticky: 0,
            category: "First Meditation",
            contentType: "video"
        }


        try {
      
            for (var i = 0; i <= newPost.length; i++) {
                await addDoc(collection(db, "posts"), newPost[i]);
            }

        } catch (error) {
            console.log(error)
        }



    };

    useEffect(() => {
        // This function will run only once after the component mounts
        console.log('Component has loaded!');

        handleAdd();
    }, []);

    return (
        <div>testing</div>
    );
};

export default UploadPosts;
