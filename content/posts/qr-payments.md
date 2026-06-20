---
title: "cracking the code: the tech behind qr payments"
date: "2025-03-08"
excerpt: "what actually happens when you scan a upi qr code — encoding, error correction, and a number bigger than the atoms in the universe."
url: "https://medium.com/@menteharshith/cracking-the-code-the-tech-behind-qr-payments-explained-67f76b8ccfa6"
doodles: [qr, rupee, phone, lock, network, wifi]
---

Ever grabbed chai and paid with just a quick scan? Or split a dinner bill without fumbling for cash — just a tap, a beep, and done?

In India, UPI payments have become second nature. From street vendors to high-end restaurants, all it takes is a QR code. But have you ever wondered what's actually happening behind the scenes when you scan one? How does your phone read that maze of black and white squares and turn it into money moving seamlessly between bank accounts? Let's break it down in a way that makes sense for a computer science enthusiast, using a UPI payment QR code as our example.

## What Exactly is a QR Code?

A **Quick Response (QR) code** is a two-dimensional barcode that encodes information in a grid of black and white squares. Unlike traditional barcodes (which store data in one dimension), QR codes use both horizontal and vertical space, making them far more efficient.

Think of a QR code as a compressed text file that a scanner can instantly decode.

Each QR code consists of:
- Finder Patterns — Large squares at three corners that help scanners detect orientation
- Alignment Patterns — Smaller squares used for correcting distortions
- Timing Patterns — Alternating black and white modules for alignment
- Format & Version Info — Metadata about error correction and the version of the QR code
- Data Modules — The actual encoded data
- Error Correction Code — Redundant data to restore missing information if the code is partially damaged
- Quiet Zone — A blank margin around the QR code ensuring proper recognition

## How is Data Stored in a QR Code?

QR codes use a combination of encoding techniques:
- Numeric Mode (0–9) — Most efficient (stores up to 7,089 digits)
- Alphanumeric Mode (A-Z, 0–9, space, $, %, *, +, -, ., /, :) — Stores up to 4,296 characters
- Byte Mode (ISO-8859–1 characters) — Used for storing arbitrary text
- Kanji Mode — Optimized for Japanese characters

Most UPI QR codes use alphanumeric or byte encoding, as they store URLs and payment details.

## UPI QR Code Example — What's Inside?

Let's say you're paying at a street vendor using a QR code. You open Google Pay, scan the code, and voilà — details pop up! But what's happening under the hood?

A UPI QR code typically contains a standardized URL following the Bharat QR format:

```
upi://pay?pa=vendor@upi&pn=VendorName&mc=1234&tid=9876543210&tr=txn123&am=50.00&cu=INR
```

Breaking it down:
- `upi://pay` — Indicates a UPI payment request
- `pa=vendor@upi` — The vendor's UPI ID
- `pn=VendorName` — Vendor's name
- `mc=1234` — Merchant category code (MCC)
- `tid=9876543210` — Transaction ID
- `tr=txn123` — Unique transaction reference number
- `am=50.00` — Payment amount
- `cu=INR` — Currency

When you scan this QR code, your payment app extracts the details, verifies them, and processes the transaction via UPI.

## How Does Your Phone Decode a QR Code?

Here's a deep technical breakdown of the steps involved in decoding a QR code:

1. **Image Capture & Preprocessing** — The camera captures the QR code image and enhances contrast using Gaussian blur and sharpening filters to improve detection accuracy
2. **Binarization (Thresholding)** — Converts the grayscale image into a pure black-and-white representation using adaptive thresholding algorithms (e.g., Otsu's method) to distinguish QR code patterns from background noise
3. **Finder Pattern Detection** — The three large squares at the corners are identified using contour detection and pattern matching, allowing the scanner to determine the QR code's orientation
4. **Perspective Correction (Homography Transformation)** — If the QR code is tilted or distorted, the system applies a perspective transformation matrix to map it onto a perfect square for accurate decoding
5. **Grid Mapping & Sampling** — The corrected QR code is overlaid with a uniform grid of sampling points, ensuring that each module is mapped correctly for decoding
6. **Error Correction (Reed-Solomon Algorithm)** — The extracted data undergoes Reed-Solomon error correction, which reconstructs missing or corrupted data blocks to ensure accurate recovery
7. **Data Extraction & Decoding** — The final binary sequence is read in a structured manner based on the QR code's version and encoding format, converting it back into readable text or URL data

Once decoded, your payment app processes the extracted UPI link, verifies the merchant details, and prompts you to confirm the transaction.

## Security, Error Correction, and Infinite Uniqueness of QR Codes

QR codes use **Reed-Solomon error correction**, which allows data recovery even if up to 30% of the code is damaged. There are four levels of error correction:

| Level | Recovery Rate |
|-------|-------|
| L (Low) | 7% |
| M (Medium) | 15% |
| Q (Quartile) | 25% |
| H (High) | 30% |

That's why you can still scan a QR code with scratches or dirt!

## Are QR Codes Infinitely Unique?

Given the vast number of possible QR codes, the chances of two different codes overlapping are virtually zero. Here's why:
- A Version 40 QR code has 31,329 data modules
- Using alphanumeric encoding, this allows 10^6167 possible combinations
- That's more than the number of atoms in the observable universe!
- Even if we generate trillions of QR codes per second, it would take billions of years to exhaust the possible combinations

This means QR codes are practically infinite and can be uniquely generated for every transaction, product, or URL without conflict.

Next time you scan a QR code, you'll know the fascinating technology at play — binary encoding, error correction, and real-time decoding. Whether it's UPI transactions, cool bitly links, or digital menus, QR codes are bridging the physical and digital worlds seamlessly.
