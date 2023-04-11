<template>
  <div>
    <template>
      <select v-model="locale" style="margin-left: 15px">
        <option
          v-for="(item, index) in locales"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </select>
    </template>
    <h1 style="text-align: center">ToDo-List</h1>
    <template>
      <div class="head">
        <a-button type="primary" @click="showModal"> {{ $t("Add") }}</a-button>
        <a-modal
          v-model="inputModal"
          title="To-do List"
          @ok="handleOk"
          @cancel="handleCancel"
          :ok-button-props="
            test
              ? { props: { disabled: false } }
              : { props: { disabled: true } }
          "
          :cancel-button-props="{ props: { disabled: false } }"
        >
          <template>
            <a-form
              :form="form"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
              @submit="handleOk"
            >
              <a-form-item label="Task" >
                <a-input
                  v-decorator="[
                    'task',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your task!',
                        },
                        {
                          validator: validateSpecialCharacters,
                        },
                        {
                          validator: validateDuplicate,
                        },
                      ],
                      getValueFromEvent: (e) => e.target.value.trim(),
                    },
                  ]"
                />
              </a-form-item>
              <a-form-item label="Status">
                <a-select
                  v-decorator="[
                    'status',
                    {
                      rules: [],
                    },
                  ]"
                  placeholder="Select a option"
                >
                  <a-select-option value="New">
                    {{ $t("new") }}
                  </a-select-option>
                  <a-select-option value="Inprogress">
                    {{ $t("inprogress") }}
                  </a-select-option>
                  <a-select-option value="Done">
                    {{ $t("done") }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Describe">
                <a-input
                  v-decorator="[
                    'describe',
                    {
                      rules: [],
                      getValueFromEvent: (e) => e.target.value.trim(),
                    },
                  ]"
                  placeholder="Please input describe"
                />
              </a-form-item>
            </a-form>
          </template>
        </a-modal>
      </div>
    </template>
    <h2></h2>

    <div class="main" style="width: 1000px">
      <a-table :columns="columns" :data-source="data" bordered>
        <div
          slot="filterDropdown"
          slot-scope="{
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            column,
          }"
          style="padding: 8px"
        >
          <a-input
            v-ant-ref="(c) => (searchInput = c)"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="
              (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
            "
            @pressEnter="
              () => handleSearch(selectedKeys, confirm, column.dataIndex)
            "
          />
          <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            {{ $t("Search") }}
          </a-button>
          <a-button
            size="small"
            style="width: 90px"
            @click="() => handleReset(clearFilters)"
          >
            {{ $t("Reset") }}
          </a-button>
        </div>
        <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <template
          v-for="col in ['task', 'status', 'describe', 'operation']"
          :slot="col"
          slot-scope="text, record"
        >
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChange(e.target.value, record.key, col)"
            :key="col"
          />
          <template v-else>
            {{ text }}
          </template>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)">{{ $t("Save") }}</a>
              <a-popconfirm
                title="Sure to cancel?"
                @confirm="() => cancel(record.key)"
              >
                <a>{{ $t("Cancel") }}</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a
                :disabled="editingKey !== ''"
                @click="() => edit(record.key)"
                >{{ $t("Edit") }}</a
              >
            </span>
          </div>
        </template>
        <template slot="delete" slot-scope="text, record">
          <a-popconfirm
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
          >
            <a href="javascript:;">
              {{ $t("Delete") }} <a-icon type="delete"
            /></a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      test: false,
      columns: [
        {
          title: this.$t('Task'),
          dataIndex: "task",
          width: "30%",
          scopedSlots: {
            customRender: "task",
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
          },
          onFilter: (value, record) => {
            return record.task
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          },
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: "Status",
          dataIndex: "status",
          width: "20%",
          scopedSlots: {
            customRender: "status",
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
          },
          onFilter: (value, record) =>
            record.status
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: "Describe",
          dataIndex: "describe",
          width: "18%",
          scopedSlots: {
            customRender: "describe",
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
          },
          onFilter: (value, record) =>
            record.describe
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: "Operation",
          dataIndex: "operation",
          width: "18%",
          scopedSlots: {
            customRender: "operation",
          },
        },
        {
          title: "Delete",
          dataIndex: "delete",
          scopedSlots: {
            customRender: "delete",
          },
        },
      ],
      editingKey: "",
      cacheData: [],
      data: [],
      searchText: "",
      searchInput: null,
      searchedColumn: "",
      inputModal: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      locales: [
        { value: "vi", label: "VI" },
        { value: "en", label: "EN" },
        { value: "jp", label: "JP" },
      ],
      locale: this.$i18n.locale,
    };
  },
  computed: {},
  watch: {
    locale(value) {
      this.$i18n.setLocale(value);
    },
  },
  methods: {
    validateSpecialCharacters(rule, value, callback) {
      if (/^[a-zA-Z0-9]*$/.test(value) && value !== "") {
        this.test = true;
        callback();
      } else {
        this.test = false;
        callback("Task does not contain special characters");
      }
    },
    validateDuplicate(rule, value, callback) {
      if (this.data.map((el) => el.task).includes(value)) {
        this.test = false;
        callback("Task Duplicate");
      } else {
        this.test = true;
        callback();
      }
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.find((item) => key === item.key);
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.find((item) => key === item.key);

      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.find((item) => key === item.key);
      const targetCache = newCacheData.find((item) => key === item.key);
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.find((item) => key === item.key);
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.find((item) => key === item.key)
        );
        delete target.editable;
        this.data = newData;
      }
    },
    onDelete(key) {
      const data = [...this.data];
      this.data = data.filter((item) => item.key !== key);
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },
    showModal() {
      this.inputModal = true;
    },
    handleOk(e) {
      e.preventDefault();
      console.log(this.form.validateFields());
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          this.data.push({
            task: `${values.task}`,
            status: `${values.status}`,
            describe: `${values.describe}`,
            key: this.data.length.toString(),
          });
          this.cacheData = this.data.map((el, index) => ({ ...el }));

          this.data?.map((el, index) => {
            localStorage.setItem(`task${index}`, el.task);
            localStorage.setItem(`status${index}`, el.status);
            localStorage.setItem(`describe${index}`, el.describe);
          });
        }
      });
      this.form.resetFields();
      this.inputModal = false;
    },
    handleCancel() {
      this.form.resetFields();
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.head {
  display: flex;
  justify-content: center;
}
.main {
  margin: 0 auto;
}
</style>
