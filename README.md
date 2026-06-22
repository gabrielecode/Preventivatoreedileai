# 🏗️ Preventivatore Edile AI

**Professional Construction Quote Generator powered by Google Gemini AI**

A sophisticated web application for creating detailed construction estimates and cost breakdowns with AI-assisted feasibility analysis.

## ✨ Features

- 🌍 **Multi-language Support**: Italian, German, French, English
- 🎯 **5 Construction Trades**: Painters, Windows/Doors, Tile Layers, Plumbers, Electricians
- 🧮 **Dynamic Item Catalog**: 40+ pre-configured construction work items with price ranges
- 💼 **Professional Quotes**: AI-generated detailed cost breakdowns and feasibility reports
- 📊 **Tax & Currency Support**: 9 European countries with automatic VAT calculation
- 💾 **Local Storage**: API key saved securely in browser (no server-side storage)
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile devices

## 🚀 Deployment on Vercel

### Prerequisites
- GitHub account connected to Vercel
- Google Generative AI API key ([Get one here](https://ai.google.dev/))

### Quick Start

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "Add New Project"
   - Select this repository
   - Click "Deploy"

2. **Configure Environment Variables (Optional)**
   - Add in Vercel Settings → Environment Variables:
   - Key: `NEXT_PUBLIC_GEMINI_API_KEY`
   - Value: Your Gemini API key
   - *Note: This is optional as the app uses client-side API key input*

3. **Access Your App**
   - Vercel will provide a unique URL
   - Share with users to start creating quotes

## 📋 How to Use

1. **Select Location**: Choose country and review VAT rate
2. **Pick Trade Sector**: Select from 5 construction specialties
3. **Browse Catalog**: Filter and add work items from the dynamic catalog
4. **Customize Items**: Adjust prices and quantities
5. **Enter Project Details**: Client info, project description, company data
6. **Set Dimensions & Labor**: Site parameters and labor costs
7. **Generate Quote**: Enter your Gemini API key and click generate
8. **Export/Share**: Copy quote text or export as needed

## 🔐 Security

- ✅ No hardcoded API keys
- ✅ API key input is optional (uses user's key or default approach)
- ✅ No backend server required
- ✅ All processing happens in the browser
- ✅ Complies with GitHub secret scanning

## 📊 Supported Trades & Items

### 🖌️ Painters (Imbianchino)
- Internal/external painting
- Wall preparation
- Decorative finishes
- Drywall solutions

### 🚪 Window/Door Specialists (Serramentista)
- PVC/aluminum windows
- Doors & blinds
- Accessories & screens

### 🏠 Tile Layers (Piastrellista)
- Floor/wall tiling
- Parquet installation
- Waterproofing

### 🔧 Plumbers (Idraulico)
- Plumbing systems
- Heating solutions
- Bathroom fixtures

### ⚡ Electricians
- Wiring & cable works
- Electrical panels
- Security systems & lighting

## 🛠️ Technical Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **API**: Google Generative Language API (Gemini)
- **Deployment**: Vercel (Static hosting)
- **Storage**: Browser LocalStorage

## 📄 License

Created for professional construction estimate generation.

## 📧 Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/gabrielecode/Preventivatoreedileai/issues)
- Contact: [Your Email]

---

**Made with ❤️ by Gabriele Sestito**
