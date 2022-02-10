<template>
    <div class="header-slider header-index">
        <div class="owl-carousel owl-carousel-main owl-theme">
            <?php foreach (array_reverse($slider) as $v) : ?>
                <div class="item">
                    <img data-src="<?= photo($v->photo); ?>" class="img-fluid lazy" alt="<?= $v->alt; ?>">
                    <div class="container">
                        <div class="item-content">
                            <div class="d-flex flex-column justify-content-center tile-text-side <?= $v->place; ?>">
                                <h3 class="vibes-title text-center" <?php if ($v->text_color) {
                                                                        echo "style='color:" . $v->text_color . "'";
                                                                    } ?>><?= $v->title; ?></h3>
                                <h2 class="cinzel-title text-center" <?php if ($v->text_color) {
                                                                            echo "style='color:" . $v->text_color . "'";
                                                                        } ?>><?= $v->subtitle; ?></h2>
                                <?php if ($v->txt_btn != '' && $v->txt_url != '') : ?>
                                    <div class="text-center">
                                        <a href="<?= $v->txt_url; ?>" class="btn custom-btn mx-0" <?php if ($v->btn_color) {
                                                                                                        echo "style='border-color:" . $v->btn_color . "'";
                                                                                                    } ?>>
                                            <span <?php if ($v->btn_color) {
                                                        echo "style='color:" . $v->btn_color . "'";
                                                    } ?>><?= $v->txt_btn; ?></span>
                                        </a>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach ?>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>