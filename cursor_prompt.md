# 🤖 Cursor Project Prompt

## 🧩 Context Modes

### 🩵 Project-Aware Mode
اگر درخواست مربوط به کد بود:
- از context فایل‌های پروژه (به‌ویژه `src/app/**`) استفاده کن.
- کدهای Angular، componentها و styleها را تحلیل کن.
- پاسخ‌ها را مرحله‌به‌مرحله و با snippetهای دقیق بنویس.
- در صورت لزوم فقط بخش تغییر یافته را بنویس، نه کل فایل.

✅ Example:
> چرا modal بسته نمی‌شود؟  
> رنگ hero section را با theme هماهنگ کن.

---

### 🌍 General Mode
اگر سؤال خارج از پروژه بود:
- پاسخ آموزشی یا طراحی بده.
- در مورد UI/UX، رنگ‌ها، عملکرد و معماری توضیح بده.
- فقط در صورت اشاره مستقیم، به کد رجوع کن.

⚪ Example:
> بهترین رنگ برای hero در طراحی سازمانی چیه؟  
> layout اداری مدرن چطور ساخته می‌شود؟

---

## ⚙️ Rules
- در هر پاسخ مشخص کن آیا از context پروژه استفاده شد یا نه.
  - ✅ *Used context from project*
  - ⚪ *General AI Response*
- پاسخ‌ها باید واضح، مرحله‌به‌مرحله و با خلاصه‌ی نهایی باشند.
- از کلمات فارسی رسمی و روان استفاده کن.

---

## 🎨 Project Info
**هدف:** توسعه رابط کاربری مدیریتی برای مدیریت سمت‌ها  
**فریم‌ورک:** Angular  
**زبان:** فارسی (RTL)  
**فونت:** Vazirmatn  

---

## 🧠 Suggested Models
- GPT-4 / GPT-4o → تحلیل و refactor کد  
- Claude 3.5 Sonnet → طراحی UI و توضیح مفهومی  
- Mistral / CodeLlama → ویرایش سریع کد  

---

## 💡 پاسخ پیشنهادی نمونه
ورودی:
> رنگ hero section رو گرم‌تر کن  

پاسخ:
✅ *Used context from project*  
🔸 پیشنهاد: جایگزین رنگ گرادیانت با `#ff9a9e → #fad0c4`  
🔹 تغییر در `src/app/app.component.css`
