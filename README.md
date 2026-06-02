# DRAJB Store — Guía de trabajo en equipo

## Integrantes y módulos

| Integrante | Módulo | Rama |
|---|---|---|
| Rachel | Login, registro y perfil de cliente | feature/auth-clients |
| Daniel | Productos, catálogo, tallas y carrito | feature/products-catalog / feature/shopping-cart |
| Anthony | Ventas y facturas | feature/sales-invoices |
| Julio | Configuración general, navbar, homepage e infraestructura | feature/infrastructure |

---

## Repositorios

- **Backend:** https://github.com/daniumana152308/drajb-backend
- **Frontend:** https://github.com/daniumana152308/drajb-frontend

---

## Estructura de ramas

```
main              ← código estable, no se toca directamente
develop           ← aquí se integra todo
  ├── feature/auth-clients
  ├── feature/products-catalog
  ├── feature/shopping-cart
  ├── feature/sales-invoices
  └── feature/infrastructure
```

---

## Configuración inicial (solo la primera vez)

### 1. Instala Git
https://git-scm.com

### 2. Clona los repos

```bash
git clone https://github.com/daniumana152308/drajb-backend.git
git clone https://github.com/daniumana152308/drajb-frontend.git
```

### 3. Entra a tu rama en cada repo

```bash
# Backend
cd drajb-backend
git checkout feature/tu-rama

# Frontend
cd ../drajb-frontend
git checkout feature/tu-rama
```

---

## Flujo de trabajo diario

Seguir siempre este orden cada vez que se vaya a trabajar:

### 1. Verificar en qué rama estás
```bash
git branch
```
La rama activa aparece con un `*`:
```
* feature/auth-clients
  develop
  main
```

### 2. Si no estás en tu rama, cambiarte
```bash
git checkout feature/tu-rama
```

### 3. Actualizarse antes de trabajar
```bash
git pull origin develop
```

### 4. Trabajar y hacer commits frecuentes
```bash
git add NombreDelArchivo.java
git commit -m "descripción corta del cambio"
```

### 5. Subir los cambios
```bash
git push origin feature/tu-rama
```

---


---

## Archivos por integrante

### Rachel
**Backend:**
- AuthController.java
- ClientController.java
- ClientFacade.java
- IClientFacade.java
- ClientMapper.java
- Client.java
- ClientDto.java
- LoginDto.java

**Frontend:**
- LoginPage.tsx
- ProfilePage.tsx
- Client.ts

---

### Daniel
**Backend:**
- ProductController.java
- DesignController.java
- SizeController.java
- ShoppingCartController.java
- CartDetailController.java
- ProductFacade.java
- DesignFacade.java
- SizeFacade.java
- ShoppingCartFacade.java
- CartDetailFacade.java
- IProductFacade.java
- IDesignFacade.java
- ISizeFacade.java
- IShoppingCartFacade.java
- ICartDetailFacade.java
- ProductMapper.java
- DesignMapper.java
- SizeMapper.java
- ShoppingCartMapper.java
- CartDetailMapper.java
- Product.java
- Design.java
- Size.java
- ShoppingCart.java
- CartDetail.java
- ProductDto.java
- DesignDto.java
- SizeDto.java
- ShoppingCartDto.java
- CartDetailDto.java

**Frontend:**
- CatalogPage.tsx
- ProductDetailPage.tsx
- CartPage.tsx
- Product.ts

---

### Anthony
**Backend:**
- SalesController.java
- SaleDetailController.java
- BillController.java
- BillDetailController.java
- SalesFacade.java
- SaleDetailFacade.java
- BillFacade.java
- BillDetailFacade.java
- ISalesFacade.java
- ISaleDetailFacade.java
- IBillFacade.java
- IBillDetailFacade.java
- SalesMapper.java
- SaleDetailMapper.java
- BillMapper.java
- BillDetailMapper.java
- Sales.java
- SaleDetail.java
- Bill.java
- BillDetail.java
- SalesDto.java
- SaleDetailDto.java
- BillDto.java
- BillDetailDto.java

**Frontend:**
- InvoicePage.tsx

---

### Julio
**Backend:**
- CorsConfig.java
- SecurityConfig.java
- GlobalExceptionHandler.java
- ResourceNotFoundException.java
- ServiceEntityController.java
- ServiceEntityFacade.java
- IServiceEntityFacade.java
- ServiceEntityMapper.java
- ServiceEntity.java
- ServiceEntityDto.java
- application.properties
- pom.xml

**Frontend:**
- Navbar.tsx
- Footer.tsx
- ProtectedRoute.tsx
- HomePage.tsx
- AuthContext.tsx
- CartContext.tsx
- Api.ts
- config.ts
- App.tsx
- main.tsx
- index.css
- vite.config.ts
- package.json
- index.html

---

## Reglas importantes

- Nunca hacer commit directamente en `main` o `develop`
- Siempre trabajar en tu rama `feature/`
- Hacer commits pequeños y frecuentes, no uno solo al final
- Si terminas tu módulo, avisarle a Daniel para hacer el Pull Request a `develop`
- Si tienes dudas sobre un archivo, preguntar antes de tocar algo de otro integrante
