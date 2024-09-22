---
sidebar_position: 4
---

# Git

Git یک نرم‌افزار کنترل نسخه است که به‌عنوان یک سیستم متن‌باز در دسترس است. این نرم‌افزار می‌تواند نسخه‌های مختلفی از یک پروژه را در بین چندین توسعه‌دهنده مدیریت کند. با استفاده از Git، تغییراتی که در کد منبع ایجاد می‌کنید را می‌توانید ردیابی کنید، برگردانید، و با دیگران به‌اشتراک بگذارید.

## Basics

- clone
- add
- status
- diff
- commit
- restore
- reset
- stash
- log

## Branching

- branch
- checkout
- switch
- merge
- tag

## Sharing

- fetch
- pull
- push
- remote


## Inspection and Comparison

- show
- diff
- reflog

## Patching

- apply
- cherry-pick
- rebase
- revert


## منابع

- https://www.atlassian.com/git
- [Pro Git](https://git-scm.com/book/en/v2)

## تمرینات

- گذراندن [Git Branching](https://learngitbranching.js.org/)
- پروژه‌ی [react](https://github.com/facebook/react) را کلون کنید به طوری که فقط آخرین تغییرات رو داشتیم باشیم.
- تمرین `basics` داخل دایرکتوری git را مطابق مراحل زیر تکمیل کنید.
    - طبق دستورالعمل موجود در README.md تمرین را ستاپ کنید.
    - این گیت در حال حاضر شامل ۵ کامیت است تغییرات بین کامیت اول تا سوم را ذخیره و ارسال کنید.
    - یک برنج جدید با نام ‍`branch-1` بسازید و به آن checkout کنید.
    - متن `Updated!` را به فایل `fileC.txt` اضافه کنید و بدون اینکه کامیت جدیدی بزنید تغییرات جدید رو به کامیت قبلی اضافه کنید. 
    - متن آخرین کامیت رو بدون اینکه تغییرات را ریست و دوباره کامیت کنید به `Change fileA & fileB & fileC files` تغییر بدید.
    - بدون ریست کردن تغییرات کامیت دوم و سوم را با هم ترکیب کنید و متن کامیت را `Add file fileB.txt & fileC.txt` قرار دهید.
    - کامیت‌هایی که فایل `fileB.txt` داخلشون Modify شده رو نشان دهید.
    - کامیت‌هایی که مربوط به فیچر `feature1` بوده را نشان دهید.
    - کامیت‌هایی که مربوط به `Author2` را نمایش دهید.
    - کامیت‌هایی که مسیج آن‌ها شامل اکستنشن ‍‍`.txt` هست را نمایش دهید.
    - اسم برنچ `branch-1` رو به `update-files` تغییر بدید.
    - روی کامیت `Adds feature1` تگ `feature1` رو بزنید طوری که در ریموت هم قابل مشاهده باشد.
    - ساختن برنچ ‍`feat-feature-2`از روی برنچ  `master` و checkout کردن بهش رو با یک دستور انجام بدید.
    - برنچ ‍`feat-feature-2` رو به ریموت پوش کنید.
    - برنچ ‍`feat-feature-2` رو هم از لوکال و هم از ریموت حذف کنید.
    - تفاوت reset --hard و reset عادی رو توضیح بدید.

- تمرین `commit-on-wrong-branch` را مطابق دستورالعمل گفته شده در فایل README.md تکمیل کنید.
- تمرین `alias` را مطابق دستورالعمل گفته شده در فایل README.md تکمیل کنید.