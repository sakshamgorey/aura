# Project Structure

This document outlines the improved folder structure and organization of the Visual Style Profiler application.

## 📁 Directory Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── badge/
│   │   ├── button/
│   │   ├── card/
│   │   └── drawer/
│   ├── forms/                 # Form-related components
│   │   └── FileUpload.vue
│   └── layout/                # Layout components
│       ├── AppLayout.vue
│       └── AnalysisDrawer.vue
├── composables/               # Vue composables
│   └── useFileAnalysis.ts
├── hooks/                     # Custom hooks (future use)
├── stores/                    # State management (future use)
├── lib/                       # Utility libraries
│   ├── constants.ts
│   └── utils.ts
├── types/                     # TypeScript type definitions
│   └── index.ts
├── views/                     # Page components
│   └── HomeView.vue
└── assets/                    # Static assets
```

## 🎨 Design System

### Theme
- Applied shadcn/ui theme with custom CSS variables
- Light and dark mode support
- Consistent color palette and spacing

### CSS Classes
- `.minimal-container` - Responsive container with proper padding
- `.minimal-card` - Consistent card styling
- `.minimal-spacing` - Responsive spacing utilities
- `.focus-ring` - Accessible focus states
- `.animate-fade-in` - Smooth entrance animations

### Mobile-First Design
- Responsive breakpoints: `sm:`, `md:`, `lg:`
- Touch-friendly interface elements
- Optimized spacing for mobile devices

## 🔧 Key Improvements

### 1. Component Organization
- **Forms**: File upload and form-related components
- **Layout**: App layout and drawer components
- **UI**: Reusable shadcn/ui components

### 2. Code Reusability
- **Composables**: `useFileAnalysis` for shared logic
- **Layout Component**: `AppLayout` for consistent page structure
- **Type Safety**: Comprehensive TypeScript definitions

### 3. Accessibility
- Focus management with `.focus-ring` class
- Keyboard navigation support
- Screen reader friendly markup

### 4. Performance
- Lazy loading capabilities
- Optimized animations
- Efficient state management

## 🚀 Usage

### Adding New Components
1. Place form components in `src/components/forms/`
2. Place layout components in `src/components/layout/`
3. Use shadcn/ui components from `src/components/ui/`

### Creating Composables
1. Add reusable logic to `src/composables/`
2. Follow the `use*` naming convention
3. Export reactive state and methods

### Styling Guidelines
- Use Tailwind CSS classes
- Apply custom CSS classes for consistency
- Follow mobile-first responsive design
- Maintain accessibility standards

## 📱 Mobile Optimization

- Touch-friendly button sizes (minimum 44px)
- Responsive typography scaling
- Optimized spacing for small screens
- Accessible focus states
- Smooth animations and transitions

## 🎯 Future Enhancements

- Add more shadcn/ui components as needed
- Implement state management with Pinia
- Add more composables for shared functionality
- Create additional layout components
- Add comprehensive testing structure
