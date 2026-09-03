INSERT INTO kaugummi (id, geschmack, image_url, inhaltsstoffe, marke, name, zuckerfrei, shop_url)
VALUES
    (1, 'Menthol', 'https://via.placeholder.com/300', 'Sorbit, Kaumasse, Aromen', 'Wrigley', 'Airwaves', NULL, 'https://www.example.com'),
    (2, 'kotzte', 'https://heyyy-gum.de/wp-content/uploads/2026/06/HEYYY_website_product-sourpineapple-Kopie.webp', 'blos nicht nehmen ist ungesund', 'HeyGum', 'Tropic Kotze', NULL, NULL),
    (3, 'Minze', 'https://www.brack.ch/true-gum-kaugummi-minze-21-g-1129898', 'Plastik Freier Kaugummi', 'True Gum', 'True Gum Mint', NULL, NULL),
    (4, 'Pineapple', 'https://www.brack.ch/true-gum-kaugummi-minze-21-g-1129898', '...', 'True Gum', 'True Gum Pineapple', NULL, NULL),
    (5, 'Minze', 'https://www.brack.ch/true-gum-kaugummi-minze-21-g-1129898', NULL, 'True Gum', 'rick', NULL, NULL)
ON DUPLICATE KEY UPDATE
    geschmack = VALUES(geschmack),
    image_url = VALUES(image_url),
    inhaltsstoffe = VALUES(inhaltsstoffe),
    marke = VALUES(marke),
    name = VALUES(name),
    zuckerfrei = VALUES(zuckerfrei),
    shop_url = VALUES(shop_url);
