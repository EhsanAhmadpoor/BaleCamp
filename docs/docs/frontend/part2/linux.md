---
sidebar_position: 5
---

# Linux 2

در این بخش با کامندها و مفاهیم پیشرفته‌تری در لینوکس آشنا میشوید.

- tree
- file
- curl
- ln
- Archiving and Compressing (tar, zip)
- User & Group management
- Permissions (chmod, chown)
- head / tail
- Text processing (sed, diff, )
- Processes (kill, ps)
- Remote (ssh, scp)


## تمرینات

1. چگونه mimetype یک فایل را داخل ترمینال متوجه بشویم؟
2. یک فایل `file1.txt` بسازید و با استفاده از یک کامند ۱۰ خط آخر فایل را مشاهده دنبال کنید. حال در یک ترمینال دیگر یک خط به آن اضافه کنید. در صورتی که به ترمینال قبلی بازگردید باید متن اضافه شده را مشاهده کنید.
3. Archive:
    1. یک دایرکتوری به نام `archive_test` بسازید و درون آن دو فایل ‍‍`file1.txt` و `file2.txt` و یک دایرکتوری به نام `dir1` که شامل `file3.txt` است بسازید. حال با یک کامند از دایرکتوری `archive_test` یک tar archive به نام ‍‍‍`archive.tar` بسازید.
    2. بدون extract کردن ‍`archive.tar` محتویات درون آن را لیست کنید.
    3. با یک کامند محتویات ‍`archive.tar` را درون یک دایرکتوری به نام `extracted_test` اکسترکت کنید.
    4. از دایرکتوری ‍‍`archive_test` یک Gzipped tar archive به نام ‍`archive.tar.gz` بسازید. تفاوت آن با tar archive قبلی چیست؟
    5. محتویات آن را در یک دایرکتوری به نام `extracted_gz` اکسترکت کنید.
    6. از دایرکتوری ‍‍`archive_test` یک زیپ به نام ‍‍`archive.zip` بسازید و بدون اکسترکت کردن آن محتویات آن را لیست کنید.
    7. از دایرکتوری ‍‍`archive_test` یک زیپ به نام ‍‍`secure_archive.zip` بسازید و برای آن یک پسورد ست کنید.
    8. هر دو زیپ ‍‍`archive.zip` و ‍‍`secure_archive.zip` را unzip کنید.
4. Text proccessing:
    1. یک فایل ‍`sample.txt` با محتویات زیر بسازید و با استفاده از ‍`sed` در خط‌های ۱ و ۲ کلمه‌ی ‍‍world را با کلمه‌ی ‍universe در آن جایگزین کنید.
    ```txt title="sample.txt"
    Hello, world!
    This is a sample text file.
    Goodbye, world!
    ```
    2. با استفاده از `sed` تمام خط‌هایی که شامل کلمه‌ی sample هستند را حذف کنید.
    3. با استفاده از `sed` که بعد از هر خطی که شامل کلمه‌ی universe است یک خط با محتوای Welcome to the universe! را اضافه کنید و نتیجه را در یک فایل جدید به نام `output.txt` ذخیره کنید.
    4. یک فایل `file1.txt` با محتوای ‍‍`Line 1\nLine 2\nLine 3` و یک فایل `file2.txt` با محتوای ‍‍`Line 1\nLine 2\nLine 4` بسازید و تفاوت این دو فایل را در یک diff.patch ذخیره کنید.
    5. یک فایل `fruits.txt` با محتویات زیر بسازید و با یک کامند درون یک فایل جدید `unique_fruits.txt` لیست میوه‌ی مرتب شده و یونیک را ذخیره کنید.
    ```txt title="fruits.txt"
    Banana
    Apple
    Cherry
    Apple
    Banana
    Cherry
    Cherry
    ```