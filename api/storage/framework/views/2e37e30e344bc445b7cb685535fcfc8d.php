<?php
    use Knuckles\Scribe\Tools\Utils as u;
?>
# <?php echo e(u::trans("scribe::headings.introduction")); ?>


<?php echo $description; ?>


<aside>
    <strong><?php echo e(u::trans("scribe::labels.base_url")); ?></strong>: <code><?php echo $baseUrl; ?></code>
</aside>

<?php echo $introText; ?>


<?php /**PATH C:\project\file-rouge\vendor\knuckleswtf\scribe\src/../resources/views//markdown/intro.blade.php ENDPATH**/ ?>