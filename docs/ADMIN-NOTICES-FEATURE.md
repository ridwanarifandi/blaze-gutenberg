# Admin Notices Feature

## Overview

Sistem admin notices yang telah diimplementasikan untuk memberikan feedback kepada user tentang status integrasi dengan plugin Admin Site Enhancement Pro.

## Fitur

### 1. **Dismissible Warning Notice**
- Muncul ketika plugin Admin Site Enhancement Pro tidak aktif
- Dapat di-dismiss oleh user dengan klik tombol X atau link "Don't show this again"
- Status dismissal disimpan per user menggunakan user meta
- Tidak akan muncul lagi setelah di-dismiss

### 2. **Success Notice**
- Muncul ketika plugin Admin Site Enhancement Pro terdeteksi aktif
- Menampilkan konfirmasi bahwa term ordering tersedia
- Auto-dismissible dan hanya muncul sekali per session

### 3. **Smart Display Logic**
- Hanya muncul untuk user dengan capability `manage_options`
- Hanya muncul di halaman admin yang relevan:
  - Dashboard
  - Plugins page
  - Block editor pages
  - WooCommerce category management
  - Halaman yang mengandung "blaze" di ID screen

## File Structure

### `includes/AdminNotices.php`
Class utama yang menangani semua admin notices:

- `show_term_order_notices()` - Menampilkan notices berdasarkan status plugin
- `show_success_notice()` - Notice sukses ketika plugin terdeteksi
- `show_warning_notice()` - Warning notice ketika plugin tidak aktif
- `should_show_notices()` - Logic untuk menentukan kapan notices ditampilkan
- `enqueue_admin_scripts()` - JavaScript untuk handling dismissal
- `dismiss_term_order_warning()` - AJAX handler untuk dismiss warning
- `reset_dismissal_status()` - Reset status dismissal (untuk testing)

### `test-admin-notices.php`
File test untuk memverifikasi functionality notices:

- Test notice yang dapat di-dismiss
- Admin menu untuk reset notices
- AJAX handling untuk test dismissal

## Cara Kerja

### 1. **Detection Logic**
```php
$is_plugin_active = blaze_is_admin_site_enhancement_pro_active();
$has_term_order = blaze_has_term_order_feature();
```

### 2. **Dismissal Storage**
```php
// Simpan status dismissal
update_user_meta(get_current_user_id(), 'blaze_term_order_warning_dismissed', true);

// Cek status dismissal
$dismissed = get_user_meta(get_current_user_id(), 'blaze_term_order_warning_dismissed', true);
```

### 3. **AJAX Dismissal**
```javascript
$.post(ajaxurl, {
    action: "blaze_dismiss_term_order_warning",
    nonce: nonce
}, function(response) {
    if (response.success) {
        notice.fadeOut();
    }
});
```

## User Experience

### Scenario 1: Plugin Tidak Aktif
1. User melihat warning notice berwarna kuning
2. Notice menjelaskan bahwa plugin tidak aktif dan fallback options akan digunakan
3. User dapat dismiss notice dengan:
   - Klik tombol X (WordPress default)
   - Klik link "Don't show this again"
4. Notice tidak akan muncul lagi setelah di-dismiss

### Scenario 2: Plugin Aktif
1. User melihat success notice berwarna hijau
2. Notice mengkonfirmasi bahwa term ordering tersedia
3. Notice auto-dismissible dan hanya muncul sekali per session

## Testing

### Reset Notices (Debug Mode)
Ketika `WP_DEBUG` aktif, tersedia menu di **Tools > Reset Blaze Notices** untuk:
- Reset semua status dismissal
- Test functionality notices
- Debugging purposes

### Manual Testing
1. Install/activate plugin tanpa Admin Site Enhancement Pro
2. Verifikasi warning notice muncul
3. Dismiss notice dan verifikasi tidak muncul lagi
4. Install/activate Admin Site Enhancement Pro
5. Verifikasi success notice muncul

## Security

- Semua AJAX requests menggunakan WordPress nonce verification
- Capability check untuk `manage_options`
- Proper sanitization dan escaping untuk output
- User meta digunakan untuk storage (aman dan per-user)

## Customization

### Menambah Screen Baru
Edit method `should_show_notices()` di `AdminNotices.php`:

```php
$allowed_screens = [
    'dashboard',
    'plugins',
    'your-custom-screen', // Tambah screen baru
];
```

### Mengubah Message
Edit methods `show_success_notice()` dan `show_warning_notice()` untuk customize pesan.

### Reset Programmatically
```php
\BlazeGutenberg\AdminNotices::reset_dismissal_status($user_id);
```

## Integration

Admin notices terintegrasi dengan:
- Plugin detection system (`includes/helpers/plugin-detection.php`)
- Term order integration
- Block editor functionality
- WooCommerce category management

Sistem ini memberikan feedback yang jelas kepada user tentang status integrasi dan memungkinkan mereka untuk mengontrol visibility notices sesuai preferensi.
