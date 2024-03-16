<template>
    <div id="codeEditor" ref='codeEditorRef'></div>
</template>


<script setup lang="ts">
import { onMounted, ref, toRaw, withDefaults, defineProps, watch } from 'vue';
import * as  monaco from 'monaco-editor';


interface Props {
    value: string;
    language: string,
    handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
    value: () => "",
    language: () => "",
    handleChange: () => {

    }
})

const codeEditor = ref();

const codeEditorRef = ref();

watch(
    () => props.language,
    () => {
        if (codeEditor.value) {
            monaco.editor.setModelLanguage(
                toRaw(codeEditor.value).getModel(),
                props.language
            )
        }
    }
)

onMounted(
    () => {
        if (!codeEditorRef.value) { return; }

        codeEditor.value = monaco.editor.create(codeEditorRef.value, {
            value: props.value,
            language: props.language,
            automaticLayout: true,
            colorDecorators:true,
            minimap: {
                enabled: true,
            },
            lineNumbers: "on",
            readOnly: false,
            theme: "vs-dark",
        })
        codeEditor.value.onDidChangeModelContent(() => {
            props.handleChange(toRaw(codeEditor.value).getValue())
        });
    },

)



</script>



<style scoped>
#codeEditor {
    width: 780px;
    height: 500px;

}
</style>