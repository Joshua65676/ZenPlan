FROM php:8.2-apache

# Install required extensions
RUN docker-php-ext-install pdo pdo_mysql

# Install system dependencies and Composer
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libzip-dev \
    default-mysql-client \
    && docker-php-ext-install zip \
    && curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin --filename=composer

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Create persistent session directory with proper permissions
RUN mkdir -p /var/lib/php/sessions && chmod 1777 /var/lib/php/sessions

# Configure PHP session storage to use persistent directory
RUN echo "session.save_path = '/var/lib/php/sessions'" >> /usr/local/etc/php/conf.d/sessions.ini

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader --no-dev

COPY . /var/www/html

RUN composer dump-autoload --optimize

EXPOSE 80