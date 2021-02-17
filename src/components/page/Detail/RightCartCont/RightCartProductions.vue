<template>
    <div class='right-cart-productions'>
        <right-cart-productions-abstract :uid='uid'></right-cart-productions-abstract>
        <right-cart-productions-list :uid='uid'></right-cart-productions-list>
    </div>
</template>

<script>
import RightCartProductionsAbstract from '@/components/page/Detail/RightCartCont/RightCartProductionsAbstract';
import RightCartProductionsList from '@/components/page/Detail/RightCartCont/RightCartProductionsList';

export default {
    name: 'RightCartProductions',
    props: {
        uid: {
            type: String,
            default: ''
        }
    },
    components: {
        RightCartProductionsAbstract,
        RightCartProductionsList
    }
};
</script>

<style scoped lang='less'>


</style>
